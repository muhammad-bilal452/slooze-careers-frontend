import { AxiosError } from "axios";

export function formatAxiosError(error: unknown): string {
  if (error instanceof AxiosError) {
    const message = error.response?.data?.message || error.message;

    return `Error: ${message}`;
  }

  return "An unknown error occurred.";
}
