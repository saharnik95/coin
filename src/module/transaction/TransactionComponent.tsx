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

const CACHE_EXPIRATION = 5 * 60 * 1000; // 5 minutes

export default function TransactionComponent() {
  const [transactionData, setTransactionData] =
    useState<TransactionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const fetchTransactionData = async () => {
    if (!id) {
      setError("No transaction ID provided");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Try to get data from localStorage
      const cachedData = localStorage.getItem(`transaction_${id}`);
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_EXPIRATION) {
          console.log("Using cached data for", id);
          setTransactionData(data);
          setLoading(false);
          return;
        }
      }

      // Fetch from primary API
      console.log("Fetching transaction data for ID:", id);
      const response = await fetch(`/api/transaction-data?id=${id}`);
      if (response.ok) {
        const data = await response.json();
        console.log("Received transaction data:", data);
        setTransactionData(data);
        // Cache the data
        localStorage.setItem(
          `transaction_${id}`,
          JSON.stringify({ data, timestamp: Date.now() })
        );
      } else if (response.status === 404) {
        // Fallback to external API
        console.log(
          "Data not found in primary API, fetching from external API"
        );
        const externalData = await fetchExternalData(id);
        if (externalData) {
          setTransactionData(externalData);
          // Cache the external data
          localStorage.setItem(
            `transaction_${id}`,
            JSON.stringify({ data: externalData, timestamp: Date.now() })
          );
        } else {
          setError(
            `Transaction data for ${id} not found. It may have expired or been removed.`
          );
        }
      } else {
        throw new Error(
          `Failed to fetch transaction data. Status: ${response.status}`
        );
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

  const fetchExternalData = async (
    coinId: string
  ): Promise<TransactionData | null> => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`
      );
      if (response.ok) {
        const data = await response.json();
        return {
          name: data.name,
          code: data.symbol.toUpperCase(),
          change: data.market_data.price_change_percentage_24h,
          buy: data.market_data.current_price.usd,
          sell: data.market_data.current_price.usd,
          usd: data.market_data.current_price.usd,
          value: data.market_data.current_price.usd,
        };
      }
    } catch (error) {
      console.error("Error fetching from external API:", error);
    }
    return null;
  };

  useEffect(() => {
    fetchTransactionData();
  }, [id]);

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
          <Button onClick={handleRetry} variant="outline">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Retry
          </Button>
          <Button onClick={handleGoBack} variant="outline">
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
          <Button onClick={handleRetry} variant="outline">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Retry
          </Button>
          <Button onClick={handleGoBack} variant="outline">
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
