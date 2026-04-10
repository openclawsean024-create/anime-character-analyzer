import { NextRequest, NextResponse } from "next/server";
import { normalizeAnalyzer } from "../../lib/analyzers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const analyzer = normalizeAnalyzer(body?.analyzer ?? body);

    if (!analyzer) {
      return NextResponse.json({ error: "Invalid analyzer payload" }, { status: 400 });
    }

    return NextResponse.json({ analyzer }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
