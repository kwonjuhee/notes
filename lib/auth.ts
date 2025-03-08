"use server";

import { cache } from "react";
import { verifyAccessToken } from "./jwt";

export const checkAuthentication = cache(async () => {
  try {
    await verifyAccessToken();

    return { isLoggedIn: true };
  } catch (e) {
    return { isLoggedIn: false };
  }
});
