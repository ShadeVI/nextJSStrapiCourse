import Link from "next/link";
import { StrapiImage } from "./strapi-image";

interface ImgHero {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
  height: number;
  width: number;
}
interface LinkHero {
  id: number;
  url: string;
  text: string;
  isExterneal: boolean;
}
interface HeroSectionDataProps {
  __component: string;
  id: number;
  heading: string;
  subHeading: string;
  image: ImgHero;
  link: LinkHero;
}

export function HeroSection({ data }: { readonly data: HeroSectionDataProps }) {
  const { heading, subHeading, image, link } = data;
  return (
    <header className="relative h-[600px] overflow-hidden">
      <StrapiImage
        alt={image.alternativeText ?? "Non saprei"}
        src={image.url}
        className="absolute inset-0 object-cover w-full h-full aspect/16:9"
        height={image.height}
        width={image.width}
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white bg-black bg-opacity-20">
        <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
          {heading}
        </h1>
        <p className="mt-4 text-lg md:text-xl lg:text-2xl">{subHeading} </p>
        <Link
          className="mt-8 inline-flex items-center justify-center px-6 py-3 text-base font-medium text-black bg-white rounded-md shadow hover:bg-gray-100"
          href={link.url}
        >
          {link.text}
        </Link>
      </div>
    </header>
  );
}
