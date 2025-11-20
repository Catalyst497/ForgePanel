// lib/mongodb.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string; // add this to .env.local
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // In dev mode, use a global variable so connection is not constantly recreated
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client
      .connect()
      .then((client) => {
        console.log("✅ MongoDB connected (development)");
        return client;
      })
      .catch((err) => {
        console.error("❌ MongoDB connection failed:", err);
        throw err;
      });
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // In production, create a new client for each connection
  client = new MongoClient(uri, options);
  clientPromise = client
    .connect()
    .then((client) => {
      console.log("✅ MongoDB connected (production)");
      return client;
    })
    .catch((err) => {
      console.error("❌ MongoDB connection failed:", err);
      throw err;
    });
}

export default clientPromise;
