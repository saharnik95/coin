import React from "react";

// تعریف نوع Props
interface TransactionComponentProps {
  slug: string; // نوع slug را به string تنظیم می‌کنیم
}

// تعریف کامپوننت با استفاده از نوع Props
const TransactionComponent: React.FC<TransactionComponentProps> = ({
  slug,
}) => {
  return <div>hello {slug}</div>;
};

export default TransactionComponent;
