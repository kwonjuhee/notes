"use server";

import { cache } from "react";
import { getEnvVar } from "@/utils/env";
import { createAccessToken, setAccessToken, verifyAccessToken } from "./jwt";

export const checkAuthentication = cache(async () => {
  try {
    await verifyAccessToken();

    return { isLoggedIn: true };
  } catch (e) {
    return { isLoggedIn: false };
  }
});

export const login = async (password: string) => {
  if (!password) {
    throw new Error("Password is required");
  }

  if (password !== getEnvVar("MY_PASSWORD")) {
    throw new Error("Invalid password");
  }

  const accessToken = await createAccessToken();
  setAccessToken(accessToken);
};
