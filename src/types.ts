import React from "react";

export interface LinkProps {
  id: number;
  text: string;
  href: string;
  isExternal: boolean;
  inNewTab?: boolean;
}

export interface ImageProps {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string;
}

export interface LogoProps {
  logoText: string;
  image: ImageProps;
}

export interface ArticleProps {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  image: ImageProps;
  author: string;
  featured: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventProps {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  image: ImageProps;
  author: string;
  featured: boolean;
  price: string;
  startDate: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

type ComponentType =
  | "blocks.hero-section"
  | "blocks.info-block"
  | "blocks.featured-article"
  | "blocks.subscribe"
  | "blocks.heading"
  | "blocks.paragraph-with-image"
  | "blocks.paragraph"
  | "blocks.full-image"
  | "blocks.content-list";

interface Base<
  T extends ComponentType,
  D extends object = Record<string, unknown>
> {
  id: number;
  __component?: T;
  documentId?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  data?: D;
}

export type Block =
  | HeroSectionProps
  | InfoBlockProps
  | FeaturedArticleProps
  | SubscribeProps
  | HeadingProps
  | ParagraphWithImageProps
  | ParagraphProps
  | FullImageProps
  | ContentListProps;

export interface HeroSectionProps extends Base<"blocks.hero-section"> {
  theme: "turquoise" | "orange";
  heading: string;
  image: ImageProps;
  cta?: LinkProps;
  logo?: LogoProps;
  author?: string;
  darken?: boolean;
}

export interface InfoBlockProps extends Base<"blocks.info-block"> {
  theme: "turquoise" | "orange";
  reversed?: boolean;
  headline: string;
  content: string;
  image: ImageProps;
  cta?: LinkProps;
}

export interface FeaturedArticleProps extends Base<"blocks.featured-article"> {
  headline: string;
  excerpt: string;
  link: LinkProps;
  image: ImageProps;
}

export interface SubscribeProps extends Base<"blocks.subscribe"> {
  headline: string;
  content: string;
  placeholder: string;
  buttonText: string;
}

export interface HeadingProps extends Base<"blocks.heading"> {
  heading: string;
  linkId?: string;
}

export interface ParagraphWithImageProps
  extends Base<"blocks.paragraph-with-image"> {
  content: string;
  image: ImageProps;
  reversed?: boolean;
  imageLandscape?: boolean;
}

export interface ParagraphProps extends Base<"blocks.paragraph"> {
  content: string;
}

export interface FullImageProps extends Base<"blocks.full-image"> {
  id: number;
  __component: "blocks.full-image";
  image: ImageProps;
}

export interface ContentListProps extends Base<"blocks.content-list"> {
  headline: string;
  query?: string;
  path: string;
  featured?: boolean;
  component: React.ComponentType<ArticleProps & { basePath: string }>;
  comp?: string;
  headlineAlignment?: "center" | "right" | "left";
  showSearch?: boolean;
  page?: string;
  showPagination?: boolean;
}
export const BlockContentListCards = {
  BlogCard: React.lazy(() =>
    import("@/components/BlogCard").then((m) => ({ default: m.BlogCard }))
  ),
  EventCard: React.lazy(() =>
    import("@/components/EventCard").then((m) => ({ default: m.EventCard }))
  ),
  DeliveryCard: React.lazy(() =>
    import("@/components/DeliveryCard").then((m) => ({
      default: m.DeliveryCard,
    }))
  ),
} as const;
export type BlockContentListCardKey = keyof typeof BlockContentListCards;

interface UserPermissions {
  id: number;
  documentId: string;
  username: string;
  email: string;
}

export interface ClaimedDelivery {
  id: number;
  documentId: string;
  type: string; // e.g., "rider"
  notes: string;
  users_permissions_user: UserPermissions;
}

export interface MealDelivery {
  id: number;
  documentId: string;
  title: string;
  description: string;
  startPickupDateTime: string | null; // Assuming this could be a string representation of a date
  endPickupDateTime: string | null; // Same as above
  size: string | null; // Assuming size could be a string, adjust as necessary
  reqRiders: number;
  fromAddress: string | null;
  toAddress: string | null;
  claimed_deliveries: ClaimedDelivery[];
}
