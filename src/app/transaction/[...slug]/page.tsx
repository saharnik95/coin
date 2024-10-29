import React from "react";
import TransactionComponent from "@/module/transaction/TransactionComponent";

interface PageProps {
  params: {
    slug: string[];
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  return (
    <div>
      <TransactionComponent slug={slug.join(" ")} />{" "}
    </div>
  );
}
