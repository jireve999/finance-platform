import { useGetSubscription } from "@/features/subscriptioins/api/use-get-subscription";
import { useSubscriptionModal } from "@/features/subscriptioins/hooks/use-subscription-modal";

export const usePaywall = () => {
  const subscriptionModal = useSubscriptionModal();
  const {
    data: subscription,
    isLoading: isLoadingSubscription,
  } = useGetSubscription();
  
  const shouldBlock = !subscription || subscription.status === "expired";

  return {
    isLoading: isLoadingSubscription,
    shouldBlock,
    triggerPaywall: () => {
      subscriptionModal.onOpen();
    },
  };
};