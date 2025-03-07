import "server-only";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { getEnvVar } from "@/utils/env";

const secretKey = getEnvVar("JWT_SECRET_KEY");
const encodedKey = new TextEncoder().encode(secretKey);
const alg = "HS256";
const payload = {
  role: "admin",
};
const expirationTime = "2h";
const validityMs = 2 * 60 * 60 * 1000;
const accessTokenCookieKey = "access_token";

export const encrypt = async ({ expirationTime }: { expirationTime: string }) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(encodedKey);
};

export const decrypt = async (token: string) => {
  const { payload } = await jwtVerify(token, encodedKey, {
    algorithms: [alg],
  });
  return payload;
};

export const getAccessToken = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(accessTokenCookieKey)?.value;

  return accessToken;
};

export const setAccessToken = async (token: string) => {
  const cookieStore = cookies();

  cookieStore.set(accessTokenCookieKey, token, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + validityMs),
    sameSite: "lax",
    path: "/",
  });
};

export const createAccessToken = async () => {
  const accessToken = await encrypt({ expirationTime });

  return accessToken;
};
