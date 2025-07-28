import { fetchAPI } from "@/utils/fetch-api";

export const DeliveryActions = {
  claimDelivery: async (documentId: string) => {
    const response = await fetchAPI(`/api/delivery/claim/${documentId}`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Failed to claim delivery");
    }

    return response.json();
  },
};
