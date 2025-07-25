"use server";
import { z } from "zod";
import {
  subscribeService,
  eventsSubscribeService,
  type EventsSubscribeProps,
} from "./services";
import { fetchAPI } from "@/utils/fetch-api";
import { cookies } from "next/headers";

const subscribeSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export async function subscribeAction(prevState: any, formData: FormData) {
  console.log("Our first server action");
  const email = formData.get("email");

  const validatedFields = subscribeSchema.safeParse({
    email: email,
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
    };
  }

  const responseData = await subscribeService(validatedFields.data.email);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      errorMessage: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    console.log(responseData.error, "from action");
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      errorMessage: "Failed to Subscribe.",
    };
  }

  return {
    ...prevState,
    zodErrors: null,
    strapiErrors: null,
    errorMessage: null,
    successMessage: "Successfully Subscribed!",
  };
}

const eventsSubscribeSchema = z.object({
  firstName: z.string().min(1, {
    message: "Please enter your first name",
  }),
  lastName: z.string().min(1, {
    message: "Please enter your last name",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  telephone: z
    .string()
    .min(1, { message: "Please enter your phone number" })
    .regex(
      /^(\+\d{1,3}[-.]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
      {
        message: "Please enter a valid phone number",
      }
    ),
});

export async function eventsSubscribeAction(
  prevState: any,
  formData: FormData
) {
  const formDataObject = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    telephone: formData.get("telephone"),
    eventId: formData.get("eventId"),
  };

  const validatedFields = eventsSubscribeSchema.safeParse(formDataObject);

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      formData: {
        ...formDataObject,
      },
    };
  }

  const dataToSend: EventsSubscribeProps = {
    ...validatedFields.data,
    event: {
      connect: [formDataObject.eventId as string],
    },
  };

  const responseData = await eventsSubscribeService(dataToSend);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      errorMessage: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      formData: {
        ...formDataObject,
      },
      errorMessage: "Failed to Subscribe.",
    };
  }

  return {
    ...prevState,
    zodErrors: null,
    strapiErrors: null,
    errorMessage: null,
    formData: null,
    successMessage: "Successfully Subscribed!",
  };
}

export const claimDeliveryAction = async (
  prevState: any,
  deliveryDocumentId: string
) => {
  const createdClaimedDelivery = await fetchAPI("/api/claimed-deliveries", {
    method: "POST",
    body: { data: { delivery: deliveryDocumentId } },
    authToken: (await cookies()).get("jwt")?.value,
  });
  // await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    ...prevState,
    createdClaimedDelivery,
    successMessage: "Delivery claimed successfully!",
  };
};

export const unClaimDeliveryAction = async (
  prevState: any,
  claimedDeliveryDocumentId: string
) => {
  const createdClaimedDelivery = await fetchAPI(
    `/api/claimed-deliveries/${claimedDeliveryDocumentId}`,
    {
      method: "DELETE",
      authToken: (await cookies()).get("jwt")?.value,
    }
  );

  return {
    ...prevState,
    createdClaimedDelivery,
    successMessage: "Delivery unclaimed successfully!",
  };
};
