"use client";

import React from "react";
import { transactionMock } from "@/module/mock/transaction/transaction";

// Types
interface TransactionSecondDescriptionComponentProps {
  name?: string;
  about?: string;
}

// Custom Hook
const useDescriptionParagraphs = (about: string) => {
  const [paragraphs, setParagraphs] = React.useState<string[]>([]);

  React.useEffect(() => {
    // Simulating API call or complex logic to split the about text into paragraphs
    const splitParagraphs = about.split("\n\n");
    setParagraphs(
      splitParagraphs.length > 1 ? splitParagraphs : [about, about]
    );
  }, [about]);

  return paragraphs;
};

// Atomic Components
const SectionTitle = ({ name }: { name: string }) => (
  <h2 className="tablet:text-right text-center text-black font-black tablet:text-[30px] tablet:leading-[50px] leading-[31px] text-xl">
    توضیحات بیشتر درباره {name}
  </h2>
);

const Paragraph = ({ content }: { content: string }) => (
  <p className="font-normal desktop:text-base desktop:leading-[32px] tablet:text-sm tablet:leading-[28px] leading-[28px] text-xs text-justify">
    {content}
  </p>
);

const DescriptionParagraphs = ({ about }: { about: string }) => {
  const paragraphs = useDescriptionParagraphs(about);

  return (
    <div className="desktop:pt-[49px] tablet:pt-[36px] pt-[39px] space-y-4">
      {paragraphs.map((paragraph, index) => (
        <Paragraph key={index} content={paragraph} />
      ))}
    </div>
  );
};

// Main Component
export default function TransactionSecondDescriptionComponent({
  name = "",
  about = "",
}: TransactionSecondDescriptionComponentProps) {
  return (
    <div className="desktop:pt-[108px] tablet:pt-[111px] pt-[39px]">
      <SectionTitle name={name} />
      <DescriptionParagraphs about={about} />
    </div>
  );
}
