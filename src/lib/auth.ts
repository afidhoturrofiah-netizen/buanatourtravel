import { cookies } from "next/headers";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const ADMIN_SESSION_COOKIE = "buana_admin_session";

function readEnvFileValue(key: string) {
  const envPaths = [
    path.join(process.cwd(), ".env.local"),
    path.join(process.cwd(), ".env"),
  ];

  for (const envPath of envPaths) {
    if (!existsSync(envPath)) continue;

    const content = readFileSync(envPath, "utf8");
    const line = content
      .split(/\r?\n/)
      .find((entry) => entry.startsWith(`${key}=`));

    if (line) {
      return line.slice(key.length + 1).trim();
    }
  }

  return "";
}

function getAdminEmail() {
  return process.env.ADMIN_EMAIL || readEnvFileValue("ADMIN_EMAIL") || "admin@buanatravel.com";
}

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || readEnvFileValue("ADMIN_PASSWORD") || "admin123";
}

export async function createAdminSession(email: string, password: string) {
  if (email !== getAdminEmail() || password !== getAdminPassword()) {
    return false;
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, "authenticated", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return true;
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_SESSION_COOKIE)?.value === "authenticated";
}
