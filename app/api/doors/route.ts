import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
    try {
    const client = await clientPromise;
    const db = client.db("forgepanel");
    const doors = await db.collection("doors").find({}).toArray();

    return NextResponse.json({doors})
    } catch(e) {
        return NextResponse.json({error: "Database error"},{status:500})
    }
}