"use server"

import { FormState } from "@/components/forms/sign-up-form"
import { z } from "zod"
import { registerUserService } from "../services/auth-service"

const schemaRegister = z.object({
  username: z.string().min(3).max(20, {
    message: "Username must be between 3 and 20 characters"
  }),
  email: z.string().email({
    message: "Please enter a valid email"
  }),
  password: z.string().min(6).max(100, {
    message: "Password must be between 6 and 100 characters"
  })
})

export async function registerUserAction(prev: any, formData: FormData): Promise<FormState> {

  const fieldsObj = {
    username: formData.get("username")?.toString(),
    email: formData.get("email")?.toString(),
    password: formData.get("password")?.toString()
  }
  const validatedFields = schemaRegister.safeParse(fieldsObj)

  if (!validatedFields.success) {
    return {
      ...prev,
      data: null,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      errorMessage: "Error fields"
    }
  }

  const responseData = await registerUserService(validatedFields.data);

  if (!responseData) {
    return {
      ...prev,
      strapiErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prev,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to Register.",
    };
  }

  console.log("#############");
  console.log("User Registered Successfully", responseData.jwt);
  console.log("#############");

  return {
    ...prev,
    data: "ok",
    zodErrors: null,
    strapiErrors: null,
    errorMessage: null,
  }
}