import { getAuthToken } from "./get-token";
import { getStrapiURL } from "@/lib/utils";

export async function mutateData(method: string, path: string, payload?: any) {
  const baseUrl = getStrapiURL();
  const authToken = await getAuthToken();
  const url = new URL(path, baseUrl);

  if (!authToken) throw new Error("No auth token found");

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ ...payload }),
    });
    if (response.ok && response.status !== 204) {
      const data = await response?.json();
      return data;
    }
    if (response.ok && response.status === 204) {
      return {
        status: response.status,
        text: "deleted"
      }
    }
    return null
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}