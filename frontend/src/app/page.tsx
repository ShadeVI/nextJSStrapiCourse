import { FeatureSection } from "@/components/custom/features-section";
import { HeroSection } from "@/components/custom/hero-section";
import { getHomePageData } from "@/data/loaders";

const blockComponents = {
  "layout.hero-section": HeroSection,
  "layout.features-section": FeatureSection,
};

/* export interface BlockHeroSection {
  __component: string;
  id: number;
  heading: string;
  subHeading: string;
  image: Image;
  link: Link;
}

export interface Image {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string;
  width: number;
  height: number;
}

export interface Link {
  id: number;
  url: string;
  text: string;
  isExternal: boolean;
}

export interface BlockFeatureSection {
  __component: string;
  id: number;
  title: string;
  description: string;
  features: Feature[];
}

export interface Feature {
  id: number;
  heading: string;
  subHeading: string;
  icon: string;
}

type Block = BlockFeatureSection | BlockHeroSection; */

function blockRenderer(block: any) {
  const Component =
    blockComponents[block.__component as keyof typeof blockComponents];
  return Component ? <Component key={block.id} data={block} /> : null;
}

export default async function Home() {
  const strapiData = await getHomePageData();
  const { blocks } = strapiData?.data || [];

  return <main>{blocks.map(blockRenderer)}</main>;
}
