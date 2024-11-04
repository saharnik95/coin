"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const fetchTransactionData = async () => {
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

    if (id) {
      fetchTransactionData();
    }
  }, [id]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!transactionData) {
    return <div>Loading...</div>;
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
