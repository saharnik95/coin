// hooks/useTransactionData.ts
"use client";
import { useEffect, useState } from "react";

interface TransactionData {
  name: string;
  code: string;
  change: number;
  buy: number;
  sell: number;
  usd: number;
  value: number;
}

export function useTransactionData(id: string | null) {
  const [transactionData, setTransactionData] =
    useState<TransactionData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactionData = async () => {
      if (!id) return;

      try {
        console.log("Fetching transaction data for ID:", id);
        const response = await fetch(`/api/transaction-data?id=${id}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Received transaction data:", data);
          setTransactionData(data);
        } else {
          console.error(
            "Failed to fetch transaction data. Status:",
            response.status
          );
          const errorText = await response.text();
          console.error("Error response:", errorText);
          setError("Failed to fetch transaction data. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching transaction data:", error);
        setError(
          "An error occurred while fetching transaction data. Please try again."
        );
      }
    };

    fetchTransactionData();
  }, [id]);

  return { transactionData, error };
}
