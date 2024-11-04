// File: src/app/api/transaction-data/route.ts
import { NextRequest, NextResponse } from "next/server";
import transactionStore from "@/app/api/transaction-store"; // Import the shared store

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  const data = transactionStore.get(id); // Retrieve data

  if (data) {
    return NextResponse.json(data);
  } else {
    return NextResponse.json({ message: "Data not found" }, { status: 404 });
  }
}
