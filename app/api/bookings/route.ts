import { NextRequest, NextResponse } from "next/server";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { isMaPackageId, maPackageById } from "../../lib/amesPackages";
import {
  AMES_SERVICE_AREA,
  AMES_TIME_SLOTS,
  getAvailableSlots,
  type AmesBookingRecord,
} from "../../lib/amesAvailability";

const DATA_FILE = path.join(process.cwd(), "data", "bookings.json");

async function readBookings(): Promise<AmesBookingRecord[]> {
  try {
    return JSON.parse(await readFile(DATA_FILE, "utf-8"));
  } catch {
    return [];
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const slot = AMES_TIME_SLOTS.find((item) => item.id === body.slotId);
  const priceFrom = isMaPackageId(body.packageId) ? maPackageById(body.packageId)?.price : undefined;
  if (
    !priceFrom ||
    typeof body.date !== "string" ||
    !slot ||
    !getAvailableSlots(AMES_SERVICE_AREA, body.date).includes(slot.id) ||
    typeof body.naam !== "string" ||
    body.naam.trim().length < 2 ||
    typeof body.telefoon !== "string" ||
    body.telefoon.trim().length < 6 ||
    typeof body.email !== "string" ||
    !body.email.includes("@")
  ) {
    return NextResponse.json({ error: "Onvolledige boeking" }, { status: 400 });
  }

  const record: AmesBookingRecord = {
    regionId: AMES_SERVICE_AREA,
    date: body.date,
    slotId: slot.id,
    packageId: body.packageId,
    extras: Array.isArray(body.extras)
      ? body.extras.filter((extra: unknown): extra is string => typeof extra === "string")
      : [],
    naam: body.naam.trim(),
    telefoon: body.telefoon.trim(),
    email: body.email.trim(),
    id: crypto.randomUUID(),
    status: "aangevraagd",
    priceFrom,
    createdAt: new Date().toISOString(),
    calendarSync: null,
  } as AmesBookingRecord;

  const bookings = await readBookings();
  bookings.unshift(record);
  await mkdir(path.dirname(DATA_FILE), { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(bookings, null, 2));

  return NextResponse.json({ id: record.id, calendarSync: record.calendarSync });
}
