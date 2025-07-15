import { fetchAPI } from "@/utils/fetch-api";
import { getStrapiURL } from "@/utils/get-strapi-url";

interface RegisterUserProps {
  username: string;
  password: string;
  email: string;
}

interface LoginUserProps {
  identifier: string;
  password: string;
}

const BASE_URL = getStrapiURL();

export async function registerUserService(userData: RegisterUserProps) {
  const url = new URL("/api/auth/local/register", BASE_URL);
  try {
    return fetchAPI(url.href, { method: "POST", body: { ...userData } });
  } catch (error) {
    console.error("Registration Service Error:", error);
  }
}

export async function loginUserService(userData: LoginUserProps) {
  const url = new URL("/api/auth/local", BASE_URL);
  try {
    return fetchAPI(url.href, { method: "POST", body: { ...userData } });
  } catch (error) {
    console.error("Login Service Error:", error);
    throw error;
  }
}
