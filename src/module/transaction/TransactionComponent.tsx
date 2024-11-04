"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, RefreshCcw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  const router = useRouter();
  const id = params.id as string;

  const fetchTransactionData = async (retries = 5) => {
    if (!id) {
      setError("No transaction ID provided");
      setLoading(false);
      return;
    }

    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/transaction-data?id=${id}`);

        if (response.ok) {
          const data = await response.json();
          console.log("Transaction Data:", data);
          setTransactionData(data);
          setLoading(false);
          return;
        } else if (response.status === 404 && attempt === retries - 1) {
          console.log(`404: Transaction ID "${id}" not found.`);
          setError(`Transaction data for ID "${id}" not found.`);
        } else {
          console.log(`Attempt ${attempt + 1} failed. Retrying...`);
          await new Promise((resolve) =>
            setTimeout(resolve, 1000 * Math.pow(2, attempt))
          ); // Exponential backoff
        }
      } catch (error) {
        console.error(
          `Error fetching transaction data (attempt ${attempt + 1}):`,
          error
        );
        if (attempt === retries - 1) {
          setError(
            "An unexpected error occurred while fetching transaction data. Please try again later."
          );
        }
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    const storedData = sessionStorage.getItem(`transaction_${id}`);
    if (storedData) {
      setTransactionData(JSON.parse(storedData));
      setLoading(false);
    } else {
      fetchTransactionData();
    }
  }, [id]);

  useEffect(() => {
    if (transactionData) {
      sessionStorage.setItem(
        `transaction_${id}`,
        JSON.stringify(transactionData)
      );
    }
  }, [transactionData, id]);

  const handleRetry = () => {
    fetchTransactionData();
  };

  const handleGoBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="space-y-4 p-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
        <div className="mt-4 flex space-x-4">
          <Button
            onClick={handleRetry}
            variant="outline"
            aria-label="Retry fetching transaction data"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Retry
          </Button>
          <Button
            onClick={handleGoBack}
            variant="outline"
            aria-label="Go back to previous page"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </Alert>
    );
  }

  if (!transactionData) {
    return (
      <Alert className="m-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Data</AlertTitle>
        <AlertDescription>
          No transaction data found for the given ID.
        </AlertDescription>
        <div className="mt-4 flex space-x-4">
          <Button
            onClick={handleRetry}
            variant="outline"
            aria-label="Retry fetching transaction data"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Retry
          </Button>
          <Button
            onClick={handleGoBack}
            variant="outline"
            aria-label="Go back to previous page"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
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
