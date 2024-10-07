import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
const { NEXT_BACKEND_BASE_URL } = process.env;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStrapiURL() {
  return NEXT_BACKEND_BASE_URL ?? 'http://localhost:1338'
}

export function getStrapiMedia(url: string | null) {
  if (url == null) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${getStrapiURL()}${url}`;
}