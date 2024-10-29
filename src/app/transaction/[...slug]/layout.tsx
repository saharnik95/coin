import React from "react";
import TransactionComponent from "@/module/transaction/TransactionComponent";

// تعریف نوع Props
interface PageProps {
  params: {
    slug: string[]; // slug را به صورت آرایه تعریف می‌کنیم
  };
}

// استفاده از async function
export default async function Page({ params }: PageProps) {
  // منتظر params می‌مانیم
  const { slug } = await params;

  return (
    <div>
      <TransactionComponent slug={slug.join(" ")} />{" "}
      {/* به عنوان یک رشته ترکیب می‌شود */}
    </div>
  );
}
