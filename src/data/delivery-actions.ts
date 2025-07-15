export const DeliveryActions = {
  claimDelivery: async (documentId: string) => {
    const response = await fetch(`/api/delivery/claim/${documentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to claim delivery");
    }

    return response.json();
  },
};
