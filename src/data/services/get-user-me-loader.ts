import { fetchAPI } from "@/utils/fetch-api";
import { getAuthToken } from "./get-token";
import { getStrapiURL } from "@/utils/get-strapi-url";

export async function getUserMeLoader() {
  const baseUrl = getStrapiURL();

  const url = new URL("/api/users/me", baseUrl);

  const authToken = await getAuthToken();
  if (!authToken) return { ok: false, data: null, error: null };

  try {
    const response = await fetchAPI(url.href, {
      method: "GET",
      authToken,
    });
    const data = response;
    // if (data.error) return { ok: false, data: null, error: data.error };
    return { ok: true, data: data, error: null };
  } catch (error) {
    console.log(error);
    return { ok: false, data: null, error: error };
  }
}
