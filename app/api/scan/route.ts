import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "scans.json");

interface Scan {
  id: string;
  contact: {
    naam: string;
    email: string;
    telefoon: string;
    bedrijf: string;
  };
  answers: { question: string; answers: string[] }[];
  submittedAt: string;
}

async function getScans(): Promise<Scan[]> {
  try {
    const data = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveScans(scans: Scan[]) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(scans, null, 2));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const scans = await getScans();

  const scan: Scan = {
    id: crypto.randomUUID(),
    contact: body.contact,
    answers: body.answers,
    submittedAt: body.submittedAt || new Date().toISOString(),
  };

  scans.unshift(scan);
  await saveScans(scans);

  return NextResponse.json({ success: true, id: scan.id });
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== "Bearer vanthom-dashboard-token") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const scans = await getScans();
  return NextResponse.json(scans);
}
