"use client";

import React from "react";
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

// Types
interface TransactionData {
  name: string;
  code: string;
  change: number;
  buy: number;
  sell: number;
  usd: number;
  value: number;
  pic: string;
  about: string;
}

// Custom Hooks
const useTransactionData = (code: string) => {
  const [transactionData, setTransactionData] =
    React.useState<TransactionData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchTransactionData = React.useCallback(async () => {
    if (!code) {
      setError("No currency code provided");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log("Fetching transaction data for code:", code);
      const response = await fetch("https://b.wallet.ir/coinlist/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page: 1,
          limit: 1,
          search: code,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Received transaction data:", data);
        if (data.items && data.items.length > 0) {
          const item = data.items[0];
          setTransactionData({
            name: item.fa_name,
            code: item.currency_code,
            change: item.daily_change_percent,
            buy: item.buy_irt_price,
            sell: item.sell_irt_price,
            usd: item.price,
            value: item.irt_price,
            pic: item.icon,
            about: item.about,
          });
        } else {
          setError(`No data found for currency code: ${code}`);
        }
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
  }, [code]);

  React.useEffect(() => {
    fetchTransactionData();
  }, [fetchTransactionData]);

  return { transactionData, loading, error, fetchTransactionData };
};

// Atomic Components
const LoadingSkeleton = () => (
  <div className="space-y-4 p-4">
    <Skeleton className="h-8 w-full" />
    <Skeleton className="h-64 w-full" />
    <Skeleton className="h-32 w-full" />
  </div>
);

const ErrorAlert = ({
  error,
  onRetry,
  onGoBack,
}: {
  error: string;
  onRetry: () => void;
  onGoBack: () => void;
}) => (
  <Alert variant="destructive" className="m-4">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>{error}</AlertDescription>
    <div className="mt-4 flex space-x-4">
      <Button onClick={onRetry} variant="outline">
        <RefreshCcw className="mr-2 h-4 w-4" />
        Retry
      </Button>
      <Button onClick={onGoBack} variant="outline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Go Back
      </Button>
    </div>
  </Alert>
);

const NoDataAlert = ({
  onRetry,
  onGoBack,
}: {
  onRetry: () => void;
  onGoBack: () => void;
}) => (
  <Alert className="m-4">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>No Data</AlertTitle>
    <AlertDescription>
      No transaction data found for the given currency code.
    </AlertDescription>
    <div className="mt-4 flex space-x-4">
      <Button onClick={onRetry} variant="outline">
        <RefreshCcw className="mr-2 h-4 w-4" />
        Retry
      </Button>
      <Button onClick={onGoBack} variant="outline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Go Back
      </Button>
    </div>
  </Alert>
);

const TransactionContent = ({ data }: { data: TransactionData }) => (
  <div className="bg-[#FCFCFE]">
    <div className="flex flex-col justify-between items-center max-w-[1140px] mx-auto desktop:px-0 desktop:pt-[60px] tablet:px-[50px] tablet:pt-[22px] tablet:pb-[76px] px-[20px] pt-[40px] pb-[31px]">
      <TransactionFormComponent
        name={data.name}
        code={data.code}
        change={data.change}
        buy={data.buy}
        sell={data.sell}
        usd={data.usd}
        value={data.value}
        pic={data.pic}
      />
      <TransactionFirstDescriptionComponent
        name={data.name}
        about={data.about}
      />
      <TransactionChartComponent name={data.name} code={data.code} />
      <TransactionSecondDescriptionComponent
        name={data.name}
        about={data.about}
      />
      <TransactionQuestionComponent name={data.name} />
    </div>
  </div>
);

// Main Component
export default function TransactionComponent() {
  const params = useParams();
  const router = useRouter();
  const encodedCode = params.id as string;
  const code = decodeURIComponent(encodedCode);

  const { transactionData, loading, error, fetchTransactionData } =
    useTransactionData(code);

  const handleRetry = () => {
    fetchTransactionData();
  };

  const handleGoBack = () => {
    router.back();
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <ErrorAlert error={error} onRetry={handleRetry} onGoBack={handleGoBack} />
    );
  }

  if (!transactionData) {
    return <NoDataAlert onRetry={handleRetry} onGoBack={handleGoBack} />;
  }

  return <TransactionContent data={transactionData} />;
}
