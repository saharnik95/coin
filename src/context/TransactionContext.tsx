"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

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
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error(
      "useTransactionContext must be used within a TransactionProvider"
    );
  }
  return context;
};

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [transactionData, setTransactionData] =
    useState<TransactionData | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("transactionData");
      if (data) {
        setTransactionData(JSON.parse(data));
      }
    }
  }, []);

  return (
    <TransactionContext.Provider value={{ transactionData }}>
      {children}
    </TransactionContext.Provider>
  );
};
