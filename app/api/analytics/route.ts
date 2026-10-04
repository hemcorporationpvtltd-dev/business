import { NextResponse } from "next/server";
import { dbStore } from "@/lib/store";

export async function GET() {
  try {
    const analytics = await dbStore.getAnalytics();
    return NextResponse.json({ success: true, analytics });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const visits = await dbStore.trackVisit(body.path || "/");
    return NextResponse.json({ success: true, visits });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Tracking failed" }, { status: 500 });
  }
}
