import React from "react";
import TransactionComponent from "@/module/transaction/TransactionComponent";
import { TransactionProvider } from "@/context/TransactionContext"; // Adjust the import path

export default function TransactionPage() {
  return (
    <TransactionProvider>
      <TransactionComponent />
    </TransactionProvider>
  );
}
