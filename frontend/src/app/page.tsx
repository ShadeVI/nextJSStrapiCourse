const { NEXT_BACKEND_BASE_URL } = process.env;
import { HeroSection } from "@/components/custom/hero-section";
import qs from "qs";

const homePageQueryParams = {
  populate: {
    blocks: {
      on: {
        "layout.hero-section": {
          populate: {
            image: {
              fields: ["url", "alternativeText", "width", "height"],
            },
            link: {
              populate: true,
            },
          },
        },
      },
    },
  },
};

async function getStrapiData(path: string) {
  const url = new URL(path, NEXT_BACKEND_BASE_URL);
  url.search = qs.stringify(homePageQueryParams);
  try {
    const res = await fetch(url.href, { cache: "no-store" });
    const data = await res.json();
    console.dir(data, { depth: null });
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default async function Home() {
  const strapiData = await getStrapiData("/api/home-page");
  const { blocks } = strapiData.data;

  return (
    <main>
      <HeroSection data={blocks[0]} />
    </main>
  );
}
