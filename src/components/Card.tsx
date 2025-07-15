"use client";
import { ImageProps } from "@/types";

import Link from "next/link";
import { StrapiImage } from "./StrapiImage";
import { formatDate } from "@/utils/format-date";
import { Button } from "./ui/button";
import { startTransition, useActionState, useTransition } from "react";
import { claimDeliveryAction } from "@/data/actions";

export interface CardProps {
  documentId: string;
  title: string;
  description: string;
  slug: string;
  image: ImageProps;
  price?: number;
  startDate?: string;
  comp?: string;
  createdAt: string;
  basePath: string;
}

export function Card(props: Readonly<CardProps>) {
  // prettier-ignore
  const {title, description, slug, image, price, createdAt, startDate, basePath, comp, documentId} = props;
  const [st, ac] = useActionState(claimDeliveryAction, {
    createdClaimedDelivery: null,
  });
  const [isPending, startTransition] = useTransition();

  let LinkOrDiv: typeof Link | "div" = Link;
  let hrefProp: any = { href: `/${basePath}/${slug}` };
  if (!slug) {
    LinkOrDiv = "div";
    hrefProp = {};
  }

  let DeliveryComp = null;
  if (comp === "DeliveryCard") {
    DeliveryComp = (
      <div className="flex flex-row justify-end gap-1">
        <Button variant="destructive" className="w-1/3 text-2xl h-14">
          Be Buddy
        </Button>
        <Button
          className="w-1/3 text-2xl h-14 whitespace-pre-wrap"
          onClick={() => startTransition(() => ac(documentId))}
          disabled={isPending}
        >
          {isPending ? "Claiming..." : "Claim Delivery"}
        </Button>
      </div>
    );
  }

  return (
    <LinkOrDiv {...hrefProp} className="content-items__card">
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
        {price && (
          <p>
            <span>Price: </span>
            {price}
          </p>
        )}
        {(startDate ?? createdAt) && (
          <p>{formatDate(startDate ?? createdAt)}</p>
        )}
        <p>{description?.slice(0, 144)}...</p>
        {DeliveryComp}
      </div>
    </LinkOrDiv>
  );
}
