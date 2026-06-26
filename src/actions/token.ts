"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// --- Validation Schemas ---
const tokenSchema = z
  .string()
  .min(1, "Token must not be empty")
  .max(4096, "Token exceeds maximum length");

const saveTokensSchema = z.object({
  accessToken: tokenSchema,
  accountToken: tokenSchema,
});

// --- Cookie Configuration ---
const tokenConfig = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
};

// --- Server Actions ---
export const saveTokens = async (accessToken: string, accountToken: string) => {
  const validated = saveTokensSchema.parse({ accessToken, accountToken });

  const cookieStore = await cookies();
  cookieStore.set("acct", validated.accountToken, tokenConfig);
  cookieStore.set("act", validated.accessToken, tokenConfig);

  revalidatePath("/");
};

export const clearTokens = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("acct");
  cookieStore.delete("act");

  revalidatePath("/");
};

export const getAccessToken = async () => {
  return (await cookies()).get("act")?.value;
};

export const getAccountToken = async () => {
  return (await cookies()).get("acct")?.value;
};
