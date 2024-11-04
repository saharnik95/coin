"use client";
import React, { createContext, useContext, useState } from "react";

interface TransactionData {
  name: string;
  code: string;
  change: number;
  buy: number;
  sell: number;
  usd: number;
  value: number;
}

interface TransactionContextType {
  transactionData: TransactionData | null;
  setTransactionData: (data: TransactionData) => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [transactionData, setTransactionData] =
    useState<TransactionData | null>(null);

  return (
    <TransactionContext.Provider
      value={{ transactionData, setTransactionData }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error(
      "useTransactionContext must be used within a TransactionProvider"
    );
  }
  return context;
};
