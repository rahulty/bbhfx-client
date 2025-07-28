"use server";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
};

export async function axiosFetch(
  url: string,
  options: FetchOptions = {}
): Promise<any> {
  const { method = "GET", headers, body } = options;

  const config: AxiosRequestConfig = {
    method,
    url,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    data: body,
  };

  try {
    const response: AxiosResponse = await axios(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // throw new Error(error.response?.data || "An error occurred");
      console.log(
        `Error ${method} data:`,
        error.response?.data || error.message
      );
    } else {
      // throw new Error("An unexpected error occurred");
      console.log(`Error ${method} data:`, error);
    }
    return {};
  }
}
