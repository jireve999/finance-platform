import crypto from "crypto";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { createId } from "@paralleldrive/cuid2";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { createCheckout, getSubscription } from "@lemonsqueezy/lemonsqueezy.js";

import { db } from "@/db/drizzle";
import { setupLemon } from "@/lib/ls";
import { subscriptions } from "@/db/schema";

setupLemon();

const app = new Hono()
  .get(
    "/current",
    clerkMiddleware(),
    async (c) => {
      const auth = getAuth(c);

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized"}, 401);
      }

      const [subscription] = await db
        .select()
        .from(subscriptions)
        .where(eq(subscriptions.userId, auth.userId));

      return c.json({ data: subscription || null });
    },
  )
  .post(
    "/checkout",
    clerkMiddleware(),
    async (c) => {
      const auth = getAuth(c);

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized"}, 401);
      }

      const [existing] = await db
        .select()
        .from(subscriptions)
        .where(eq(subscriptions.userId, auth.userId));
      
      if (existing?.subscriptionId) {
          const subscription = await getSubscription(
            existing.subscriptionId,
          );
          const portalUrl = subscription.data?.data.attributes.urls.customer_portal;

          if (!portalUrl) {
            return c.json({ error: "Internal error" }, 500);
          }

          return c.json({ data: portalUrl });
        }

      const checkout = await createCheckout(
        process.env.LEMONSQUEEZY_STORE_ID!,
        process.env.LEMONSQUEEZY_PRODUCT_ID!,
        {
          checkoutData: {
            custom: {
              user_id: auth.userId,
            },
          },
          productOptions: {
            redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL!}/`,
          },
        },
      );

      const checkoutUrl = checkout.data?.data.attributes.url;

      if (!checkoutUrl) {
        return c.json({ error: "Internal error" }, 500);
      }

      return c.json({ data: checkoutUrl });
    },
  )
  .post(
    "/webhook",
    async (c) => {
      const text = await c.req.text();

      const hmac = crypto.createHmac(
        "sha256",
        process.env.LEMONSQUEEZY_WEBHOOK_SECRET!,
      );
      const digest = Buffer.from (
        hmac.update(text).digest("hex"),
        "utf-8",
      );

      const signature = Buffer.from(
        c.req.header("x-signature") as string,
        "utf-8",
      );

      if (!crypto.timingSafeEqual(digest, signature)) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const payload = JSON.parse(text);
      const event = payload.meta.event_name;

      const subscriptionId = payload.data.id;
      const userId = payload.meta.custom_data.user_id;
      const status = payload.data.attributes.status;

      const [existing] = await db
        .select()
        .from(subscriptions)
        .where(eq(subscriptions.subscriptionId, subscriptionId));

      if (event === "subscription_created") {
        if(existing) {
          await db
          .update(subscriptions)
          .set({
            status,
          })
          .where(eq(subscriptions.subscriptionId, subscriptionId));
        } else {
          await db
          .insert(subscriptions)
          .values({
            id: createId(),
            userId,
            subscriptionId,
            status,
          });
        }      
      }
      if (event === "subscription_update") {
        if(existing) {
          await db
          .update(subscriptions)
          .set({
            status,
          })
          .where(eq(subscriptions.subscriptionId, subscriptionId));
        } else {
          await db
          .insert(subscriptions)
          .values({
            id: createId(),
            userId,
            subscriptionId,
            status,
          });
        }      
      }

      return c.json({}, 200);
    },
  )

export default app;