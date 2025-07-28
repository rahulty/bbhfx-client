import { BASE_URL } from "@/data/services";
import { axiosFetch, FetchOptions } from "./axios-fetch";

type NextFetchRequestConfig = {
  revalidate?: number | false;
  tags?: string[];
};

interface FetchAPIOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  authToken?: string;
  body?: Record<string, unknown>;
  next?: NextFetchRequestConfig;
}

export async function fetchAPI(url: string, options: FetchAPIOptions) {
  const { method, authToken, body, next } = options;
  let urlWithBase = url;

  const headers: RequestInit & { next?: NextFetchRequestConfig } = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
    ...(next && { next }),
    // ...{ next: { revalidate: 36000 } },
  };
  if (url.startsWith("/")) {
    urlWithBase = `${BASE_URL}${url}`;
  }

  try {
    const response = await axiosFetch(urlWithBase, headers as FetchOptions);
    // const contentType = response.headers.get("content-type");
    // if (
    //   contentType &&
    //   contentType.includes("application/json") &&
    //   response.statusText === "OK"
    // ) {
    //   return response;
    // } else {
    //   return { status: response.status, statusText: response.statusText };
    // }
    return response;
  } catch (error) {
    console.error(`Error ${method} data:`, error);
    throw error;
  }
}
