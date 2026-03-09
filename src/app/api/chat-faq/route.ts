import { NextResponse } from "next/server";

import { getHomepageSettings } from "@/lib/cms-storage";

export const revalidate = 300;

export async function GET() {
  const homepageSettings = await getHomepageSettings();
  return NextResponse.json({ faqItems: homepageSettings.faqItems });
}
