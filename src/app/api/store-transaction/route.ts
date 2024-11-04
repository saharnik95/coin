// File: src/app/api/store-transaction/route.ts
import { NextRequest, NextResponse } from "next/server";
import transactionStore from "@/app/api/transaction-store";

export async function POST(request: NextRequest) {
  try {
    const { id, data } = await request.json();

    if (!id || !data) {
      return NextResponse.json(
        { message: "Invalid data provided" },
        { status: 400 }
      );
    }

    transactionStore.set(id, data);
    console.log(`Stored data for id: ${id}`, data);

    // Ensure data is stored before responding
    await new Promise((resolve) => setTimeout(resolve, 100));

    return NextResponse.json({ message: "Data stored successfully", data });
  } catch (error) {
    console.error("Error storing transaction data:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
