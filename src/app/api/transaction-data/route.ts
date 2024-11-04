import { NextRequest, NextResponse } from "next/server";

const transactionStore = new Map<string, any>();

export async function POST(request: NextRequest) {
  const { id, data } = await request.json();
  transactionStore.set(id, data);
  console.log(`Stored data for id: ${id}`, data);
  return NextResponse.json({ message: "Data stored successfully" });
}

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }
  const data = transactionStore.get(id);
  console.log(`Fetched data for id: ${id}`, data);
  if (data) {
    return NextResponse.json(data);
  } else {
    return NextResponse.json({ message: "Data not found" }, { status: 404 });
  }
}
