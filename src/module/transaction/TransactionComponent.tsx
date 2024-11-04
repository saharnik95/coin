"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import TransactionChartComponent from "./components/TransactionChartComponent";
import TransactionFirstDescriptionComponent from "./components/TransactionFirstDescriptionComponent";
import TransactionFormComponent from "./components/TransactionFormComponent";
import TransactionSecondDescriptionComponent from "./components/TransactionSecondDescriptionComponent";
import TransactionQuestionComponent from "./components/TransactionQuestionComponent";

interface TransactionData {
  name: string;
  code: string;
  change: number;
  buy: number;
  sell: number;
  usd: number;
  value: number;
}

export default function TransactionComponent() {
  const [transactionData, setTransactionData] =
    useState<TransactionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const fetchTransactionData = async () => {
      if (!id) {
        setError("No transaction ID provided");
        setLoading(false);
        return;
      }

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
          setError("Failed to fetch transaction data. Please try again later.");
        }
      } catch (error) {
        console.error("Error fetching transaction data:", error);
        setError(
          "An error occurred while fetching transaction data. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionData();
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!transactionData) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Data</AlertTitle>
        <AlertDescription>
          No transaction data found for the given ID.
        </AlertDescription>
      </Alert>
    );
  }

  const { name, change, buy, sell, code, usd, value } = transactionData;

  return (
    <div className="flex flex-col justify-between items-center bg-[#FCFCFE] desktop:px-[150px] desktop:pt-[60px] tablet:px-[50px] tablet:pt-[22px] tablet:pb-[76px] px-[20px] pt-[40px] pb-[31px]">
      <TransactionFormComponent
        name={name}
        code={code}
        change={change}
        buy={buy}
        sell={sell}
        usd={usd}
        value={value}
      />
      <TransactionFirstDescriptionComponent name={name} />
      <TransactionChartComponent name={name} code={code} />
      <TransactionSecondDescriptionComponent name={name} />
      <TransactionQuestionComponent name={name} />
    </div>
  );
}
