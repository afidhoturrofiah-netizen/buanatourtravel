import { NextResponse } from "next/server";

import { getHomepageSettings } from "@/lib/cms-storage";

export const dynamic = "force-dynamic";

export async function GET() {
  const homepageSettings = await getHomepageSettings();
  return NextResponse.json({ faqItems: homepageSettings.faqItems });
}
