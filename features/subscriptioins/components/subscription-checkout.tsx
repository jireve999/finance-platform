import { Button } from "@/components/ui/button";
import { useGetSubscription } from "@/features/subscriptioins/api/use-get-subscription";
import { useCheckoutSubscription } from "@/features/subscriptioins/api/use-checkout-subscription";

export const SubscriptionCheckout = () => {
  const checkout = useCheckoutSubscription();
  const {
    data: subscription,
    isLoading: isLoadingSubscription,
  } = useGetSubscription();

  return (
    <Button
      onClick={() => checkout.mutate()}
      disabled={checkout.isPending || isLoadingSubscription}
      variant="ghost"
      size="sm"
    >
      {subscription ? "Manage" : "Upgrade"}
    </Button>
  )
}