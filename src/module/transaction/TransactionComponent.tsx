"use client";

import React from "react";
import TransactionChartComponent from "./components/TransactionChartComponent";
import TransactionFirstDescriptionComponent from "./components/TransactionFirstDescriptionComponent";
import TransactionFormComponent from "./components/TransactionFormComponent";
import TransactionSecondDescriptionComponent from "./components/TransactionSecondDescriptionComponent";
import TransactionQuestionComponent from "./components/TransactionQuestionComponent";
import { QueryClient, QueryClientProvider } from "react-query";
import { useTransactionContext } from "@/context/TransactionContext"; // Adjust the import path

interface TransactionComponentProps {}

const queryClient = new QueryClient(); // Initialize the QueryClient here

const TransactionComponent: React.FC<TransactionComponentProps> = ({}) => {
  const { transactionData } = useTransactionContext(); // Move the hook call here

  // Destructure transactionData for easier access
  const { name, change, buy, sell, code, usd, value } = transactionData || {};

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col justify-between items-center bg-[#FCFCFE] desktop:px-[150px] desktop:pt-[60px] tablet:px-[50px] tablet:pt-[22px] tablet:pb-[76px] px-[20px] pt-[40px] pb-[31px]">
        <TransactionFormComponent
          name={name} // Ensure these props match the defined interface
          code={code}
          change={change}
          buy={buy}
          sell={sell}
          usd={usd}
          value={value}
        />

        <TransactionFirstDescriptionComponent
          name={name} // Ensure these props match the defined interface
          code={code}
          change={change}
          buy={buy}
          sell={sell}
        />
        <TransactionChartComponent
          name={name} // Ensure these props match the defined interface
          code={code}
          change={change}
          buy={buy}
          sell={sell}
        />
        <TransactionSecondDescriptionComponent
          name={name} // Ensure these props match the defined interface
          code={code}
          change={change}
          buy={buy}
          sell={sell}
        />
        <TransactionQuestionComponent
          name={name} // Ensure these props match the defined interface
          code={code}
          change={change}
          buy={buy}
          sell={sell}
        />
      </div>
    </QueryClientProvider>
  );
};

export default TransactionComponent;
