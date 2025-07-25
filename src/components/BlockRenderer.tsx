import {
  BlockContentListCards,
  type Block,
  type BlockContentListCardKey,
} from "@/types";

import { HeroSection } from "@/components/blocks/HeroSection";
import { InfoBlock } from "@/components/blocks/InfoBlock";
import { FeaturedArticle } from "@/components/blocks/FeaturedArticle";
import { Subscribe } from "@/components/blocks/Subscribe";
import { Heading } from "@/components/blocks/Heading";
import { ParagraphWithImage } from "@/components/blocks/ParagraphWithImage";
import { Paragraph } from "@/components/blocks/Paragraph";
import { ContentList } from "./ContentList";
import { BlogCard } from "./BlogCard";

function blockRenderer(block: Block, index: number) {
  switch (block.__component) {
    case "blocks.hero-section":
      return <HeroSection {...block} key={index} />;
    case "blocks.info-block":
      return <InfoBlock {...block} key={index} />;
    case "blocks.featured-article":
      return <FeaturedArticle {...block} key={index} />;
    case "blocks.subscribe":
      return <Subscribe {...block} key={index} />;
    case "blocks.heading":
      return <Heading {...block} key={index} />;
    case "blocks.paragraph-with-image":
      return <ParagraphWithImage {...block} key={index} />;
    case "blocks.paragraph":
      return <Paragraph {...block} key={index} />;
    case "blocks.content-list":
      const { comp } = block;
      const cardKey = (comp || "BlogCard") as BlockContentListCardKey;
      // @ts-ignore
      block.component = BlockContentListCards[cardKey] || BlogCard;
      return <ContentList {...block} key={index} />;
    default:
      return null;
  }
}

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return blocks.map((block, index) => blockRenderer(block, index));
}
