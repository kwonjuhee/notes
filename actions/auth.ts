"use server";

import { createAccessToken, setAccessToken } from "@/lib/jwt";
import { getEnvVar } from "@/utils/env";

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
