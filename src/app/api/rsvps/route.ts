import { NextResponse } from "next/server";
import { getMongoClient, mongoDatabaseName } from "@/lib/mongodb";

export const runtime = "nodejs";

const MAX_NAME_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 400;

function readText(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function GET() {
  try {
    const client = await getMongoClient();
    const rsvps = await client
      .db(mongoDatabaseName)
      .collection("rsvps")
      .find({}, { projection: { _id: 0, attending: 1, name: 1, guests: 1, message: 1, at: 1 } })
      .sort({ createdAt: -1 })
      .limit(500)
      .toArray();

    return NextResponse.json(rsvps);
  } catch (error) {
    console.error("Failed to load RSVPs.", error);
    return NextResponse.json({ error: "Unable to load attendance right now." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      attending?: unknown;
      name?: unknown;
      guests?: unknown;
      message?: unknown;
    };
    const name = readText(body.name, MAX_NAME_LENGTH);
    const message = readText(body.message, MAX_MESSAGE_LENGTH);
    const attending = body.attending === true;
    const guests = attending ? Number(body.guests) : 0;

    if (!name || (attending && (!Number.isInteger(guests) || guests < 1 || guests > 20))) {
      return NextResponse.json({ error: "Please provide a valid name and guest count." }, { status: 400 });
    }

    const rsvp = {
      attending,
      name,
      guests,
      message,
      at: new Date().toISOString(),
      createdAt: new Date(),
    };
    const client = await getMongoClient();
    await client.db(mongoDatabaseName).collection("rsvps").insertOne(rsvp);

    return NextResponse.json(
      { attending, name, guests, message, at: rsvp.at },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to save RSVP.", error);
    return NextResponse.json({ error: "Unable to save your RSVP right now." }, { status: 500 });
  }
}
