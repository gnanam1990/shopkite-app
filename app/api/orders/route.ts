import { NextResponse } from "next/server";
import { proxyOrders } from "@/lib/shopkite-data";

export async function GET(request: Request) {
  const result = await proxyOrders(request);
  return NextResponse.json(result.body, { status: result.status });
}

export async function POST(request: Request) {
  const result = await proxyOrders(request);
  return NextResponse.json(result.body, { status: result.status });
}
