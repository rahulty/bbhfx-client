"use client";
import { useActionState, useTransition } from "react";
import { claimDeliveryAction, unClaimDeliveryAction } from "@/data/actions";
import { ClaimedDelivery, MealDelivery } from "@/types";
import { authStore } from "@/store/auth-store";
import { formatDate } from "@/utils/format-date";
import { StrapiImage } from "./StrapiImage";
import { Button } from "./ui/button";
import { CardProps } from "./Card";

type DeliveryCardProps = Readonly<CardProps> & MealDelivery;

export function DeliveryCard(props: DeliveryCardProps) {
  // prettier-ignore
  const {title, description,  documentId, image, startPickupDateTime, 
    endPickupDateTime, size, reqRiders, fromAddress, toAddress, claimed_deliveries
  } = props;
  // prettier-ignore
  const roles: Record<string, ClaimedDelivery[]> = {rider: [],buddy: [],backup: []};
  let myClaimedDelivery = null; //'rider'||'buddy'||'backup';
  for (const cd of claimed_deliveries) {
    if (roles.hasOwnProperty(cd.type)) {
      roles[cd.type].push(cd);
    }
    if (
      cd.users_permissions_user?.documentId ===
      //@ts-ignore
      authStore.getSnapshot().context.user?.documentId
    ) {
      myClaimedDelivery = cd;
    }
  }
  const { rider, buddy, backup } = roles;

  const [, ac] = useActionState(claimDeliveryAction, {
    createdClaimedDelivery: null,
  });
  const [, unClaimAc] = useActionState(unClaimDeliveryAction, {});
  const [isPending, startTransition] = useTransition();
  const disableClaimDelivery = isPending || rider.length >= reqRiders || false;

  return (
    <div className="content-items__card">
      <div className="content-items__card-img">
        {image ? (
          <StrapiImage
            src={image.url}
            alt={image.alternativeText || "No alternative text provided"}
            width={400}
            height={400}
          />
        ) : null}
      </div>
      <div className="content-items__card-text">
        <h5>{title}</h5>
        {size && (
          <p>
            <span>Size: </span>
            {size}
          </p>
        )}
        {startPickupDateTime && <p>{formatDate(startPickupDateTime)}</p>}
        <p>{description?.slice(0, 144)}...</p>
        <div className="flex flex-row justify-end gap-1">
          <Button variant="destructive" className="w-1/3 text-2xl h-14">
            Be Buddy
          </Button>
          <div className="w-1/3 flex flex-col">
            {myClaimedDelivery?.type === "rider" ? (
              <Button
                className="text-2xl h-full max-h-14"
                variant="destructive"
                onClick={() =>
                  startTransition(() => unClaimAc(myClaimedDelivery.documentId))
                }
              >
                Un Claim Delivery
              </Button>
            ) : (
              <Button
                className="text-2xl h-full max-h-14"
                onClick={() => startTransition(() => ac(documentId))}
                disabled={disableClaimDelivery}
              >
                {isPending ? "Claiming..." : "Claim Delivery"}
              </Button>
            )}
            {rider.map((r) => (
              <div key={r.documentId} className="text-sm">
                {r?.users_permissions_user?.username}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
