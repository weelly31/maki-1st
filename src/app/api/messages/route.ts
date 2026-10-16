import { NextResponse } from "next/server";
import { getMongoClient, mongoDatabaseName } from "@/lib/mongodb";

export const runtime = "nodejs";

const MAX_NAME_LENGTH = 60;
const MAX_MESSAGE_LENGTH = 400;

function readText(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function GET() {
  try {
    const client = await getMongoClient();
    const messages = await client
      .db(mongoDatabaseName)
      .collection("messages")
      .find({}, { projection: { _id: 0, name: 1, text: 1, at: 1 } })
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Failed to load blessing messages.", error);
    return NextResponse.json({ error: "Unable to load messages right now." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { name?: unknown; text?: unknown };
    const name = readText(body.name, MAX_NAME_LENGTH);
    const text = readText(body.text, MAX_MESSAGE_LENGTH);

    if (!name || !text) {
      return NextResponse.json({ error: "Name and message are required." }, { status: 400 });
    }

    const message = { name, text, at: new Date().toISOString(), createdAt: new Date() };
    const client = await getMongoClient();
    await client.db(mongoDatabaseName).collection("messages").insertOne(message);

    return NextResponse.json({ name, text, at: message.at }, { status: 201 });
  } catch (error) {
    console.error("Failed to save blessing message.", error);
    return NextResponse.json({ error: "Unable to save your message right now." }, { status: 500 });
  }
}
