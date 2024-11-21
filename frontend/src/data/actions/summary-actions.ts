"use server";

import { getAuthToken } from "@/data/services/get-token";
import { mutateData } from "@/data/services/mutate-data";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface Payload {
  data: {
    title?: string;
    videoId: string;
    summary: string;
  };
}

export async function createSummaryAction(payload: Payload) {
  const authToken = await getAuthToken();
  if (!authToken) throw new Error("No auth token found");

  const data = await mutateData("POST", "/api/summaries", payload);
  redirect("/dashboard/summaries/" + data.data.documentId);
}

export async function updateSummaryAction(prevState: any, formData: FormData) {
  const rawFormData = Object.fromEntries(formData)
  const id = rawFormData.id as string

  const payload = {
    data: {
      title: rawFormData.title,
      summary: rawFormData.summary
    }
  }

  const responseData = await mutateData("PUT", `/api/summaries/${id}`, payload)

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      message: "Oops! Something went wrong. Please try again."
    }
  }
  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      message: "Failed to update summary.",
    };
  }

  revalidatePath("/dashboard/summaries");

  return {
    ...prevState,
    message: "Summary updated successfully",
    data: responseData,
    strapiErrors: null,
  };
}

export async function deleteSummaryAction(id: string, prevState: any) {
  console.log("ID DELETE: ", id)
  const responseData = await mutateData("DELETE", `/api/summaries/${id}`);
  console.log("RESPONSE DELETE ACTION --> ", responseData)

  if (responseData)

    if (!responseData) {
      return {
        ...prevState,
        strapiErrors: null,
        message: "Oops! Something went wrong. Please try again.",
      };
    }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      message: "Failed to delete summary.",
    };
  }

  revalidatePath("/dashboard/summaries");
  redirect("/dashboard/summaries");
}
