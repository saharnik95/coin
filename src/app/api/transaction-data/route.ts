// File: src/app/api/transaction-data/route.ts
import { NextRequest, NextResponse } from "next/server";
import transactionStore from "@/app/api/transaction-store";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  let retries = 5;
  let delay = 100;

  while (retries > 0) {
    const data = transactionStore.get(id);

    if (data) {
      console.log(`Data found for key: ${id}`, data);
      return NextResponse.json(data);
    }

    console.log(`No data found for key: ${id}. Retries left: ${retries}`);
    await new Promise((resolve) => setTimeout(resolve, delay));
    retries--;
    delay *= 2; // Exponential backoff
  }

  console.log(`Data not found for key: ${id} after all retries`);
  return NextResponse.json({ message: "Data not found" }, { status: 404 });
}
