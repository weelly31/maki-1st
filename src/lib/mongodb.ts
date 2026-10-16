import { MongoClient } from "mongodb";

const globalForMongo = globalThis as typeof globalThis & {
  __mongoClientPromise?: Promise<MongoClient>;
};

export function getMongoClient() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable.");
  }

  const clientPromise =
    globalForMongo.__mongoClientPromise ??
    new MongoClient(uri).connect();

  if (process.env.NODE_ENV !== "production") {
    globalForMongo.__mongoClientPromise = clientPromise;
  }

  return clientPromise;
}

export const mongoDatabaseName = process.env.MONGODB_DB ?? "maki-1st";
