import { getStrapiURL } from "@/lib/utils";
import { unstable_noStore as noStore } from "next/cache"
import qs from "qs";

const baseUrl = getStrapiURL()

export async function fetchData(url: string) {
  const authToken = null; // we will implement this later getAuthToken() later
  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    const response = await fetch(url, authToken ? headers : {});
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null
  }
}

export async function getGlobalMetadata() {
  noStore()
  const url = new URL("/api/global", baseUrl);
  url.search = qs.stringify({
    fields: ["title", "description"]
  })
  return await fetchData(url.href)
}

export async function getHomePageData() {
  noStore()
  const url = new URL("/api/home-page", baseUrl);
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
          "layout.features-section": {
            populate: {
              features: {
                populate: true,
              },
            },
          },
        },
      },
    },
  };
  url.search = qs.stringify(homePageQueryParams);
  return await fetchData(url.href);
}

export async function getGlobalData() {
  noStore()
  const url = new URL("/api/global", baseUrl);

  url.search = qs.stringify({
    populate: [
      "header.logoText",
      "header.ctaButton",
      "footer.logoText",
      "footer.socialLinks",
    ]
  })
  return await fetchData(url.href)
}