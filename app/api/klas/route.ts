import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { Resend } from "resend";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "klas-aanmeldingen.json");

interface Aanmelding {
  id: string;
  naam: string;
  email: string;
  bedrijf: string;
  submittedAt: string;
}

async function getAanmeldingen(): Promise<Aanmelding[]> {
  try {
    const data = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveAanmeldingen(items: Aanmelding[]) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(items, null, 2));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const items = await getAanmeldingen();

  const aanmelding: Aanmelding = {
    id: crypto.randomUUID(),
    naam: body.naam,
    email: body.email,
    bedrijf: body.bedrijf || "",
    submittedAt: new Date().toISOString(),
  };

  items.unshift(aanmelding);
  await saveAanmeldingen(items);

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
      await resend.emails.send({
        from: "Business Minds <onboarding@resend.dev>",
        to: aanmelding.email,
        subject: "Bevestiging: Je plek is gereserveerd! 🎯",
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 24px; background: #0a0a0a; color: #fff;">
            <div style="text-align: center; margin-bottom: 32px;">
              <img src="https://i.imgur.com/placeholder.png" alt="Business Minds" width="60" />
            </div>
            <h1 style="font-size: 24px; font-weight: 800; margin: 0 0 8px; text-transform: uppercase; letter-spacing: -0.5px;">
              Hey ${aanmelding.naam.split(" ")[0]}! 👋
            </h1>
            <p style="color: #d4a33a; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 24px;">
              Je plek is gereserveerd
            </p>
            <p style="color: rgba(255,255,255,0.5); font-size: 15px; line-height: 1.7; margin: 0 0 24px;">
              Bedankt voor je aanmelding voor de exclusieve klas met <strong style="color: #fff;">Xavier Molijn</strong>. 
              We hebben je plek vastgelegd.
            </p>
            <div style="background: #111; border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
              <p style="color: rgba(255,255,255,0.3); font-size: 10px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 12px;">Details</p>
              <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin: 0 0 6px;">📅 Datum: Binnenkort bekend</p>
              <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin: 0 0 6px;">👥 Max. 15 personen</p>
              <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin: 0;">🍽️ Hapjes & drankjes inbegrepen</p>
            </div>
            <p style="color: rgba(255,255,255,0.3); font-size: 13px; line-height: 1.6; margin: 0;">
              Je ontvangt een herinnering zodra de datum bekend is. Tot snel!
            </p>
            <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.05); margin: 32px 0 16px;" />
            <p style="color: rgba(255,255,255,0.15); font-size: 11px; text-align: center; margin: 0;">
              © ${new Date().getFullYear()} Business Minds
            </p>
          </div>
        `,
      });
    } catch {
      // mail failed silently
    }
  }

  return NextResponse.json({ success: true, total: items.length });
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth === "Bearer bm-dashboard-token") {
    const items = await getAanmeldingen();
    return NextResponse.json(items);
  }
  const items = await getAanmeldingen();
  return NextResponse.json({ total: items.length });
}
