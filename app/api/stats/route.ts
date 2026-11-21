import { NextResponse } from "next/server";
import { getOrderStats } from "@/lib/shopkite-data";

export async function GET() {
  const result = await getOrderStats();
  return NextResponse.json(result.body, {
    status: result.status,
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
