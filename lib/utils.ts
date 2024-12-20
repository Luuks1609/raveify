import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const APP_NAME = "Raveify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Intl.DateTimeFormat("nl-NL", options).format(new Date(date));
}

export async function fetchImageAsBase64(imageUrl: string): Promise<string> {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const base64String = Buffer.from(arrayBuffer).toString("base64");
  return base64String;
}

export async function logger(
  status: "failed" | "success",
  message: string,
  action: string,
  apiKey: string,
  errorMessage?: string,
) {
  try {
    const response = await fetch(
      "https://exodius-portal.vercel.app/api/logger",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({
          project: APP_NAME,
          status,
          message,
          errorMessage,
          action,
        }),
      },
    );
    if (!response.ok) {
      console.error("Failed to log message to API:", response.statusText);
      // Optionally, handle the logging failure here, e.g., by sending an alert
    }
  } catch (error) {
    console.error("Error logging message:", error);
    // Optionally, handle the logging error here, e.g., by sending an alert
  }
}
