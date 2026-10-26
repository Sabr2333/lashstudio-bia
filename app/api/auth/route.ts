import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (username === "Vanthom.nl" && password === "123456") {
    return NextResponse.json({ token: "vanthom-dashboard-token" });
  }

  return NextResponse.json({ error: "Ongeldige inloggegevens" }, { status: 401 });
}
