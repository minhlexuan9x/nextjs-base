"use server";

import { cookies } from "next/headers";

const tokenConfig: any = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  httpOnly: true,
  secure: process.env.NEXT_PUBLIC_ENV == "production",
  sameSite: "lax",
};

export const saveTokens = async (accessToken: string, accountToken: string) => {
  (await cookies()).set("acct", accountToken, tokenConfig);
  (await cookies()).set("act", accessToken, tokenConfig);
  return;
};

export const clearTokens = async () => {
  (await cookies()).delete("acct");
  (await cookies()).delete("act");
  return;
};

export const getAccessToken = async () => {
  return (await cookies()).get("act")?.value;
};

export const getAccountToken = async () => {
  return (await cookies()).get("acct")?.value;
};
