"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { transactionMock } from "@/module/mock/transaction/transaction";

// Types
interface TransactionQuestionComponentProps {
  name?: string;
}

interface FAQItem {
  value: string;
  question: string;
  answer: string;
}

// Custom Hooks
const useFAQData = () => {
  const [faqItems, setFAQItems] = React.useState<FAQItem[]>([]);

  React.useEffect(() => {
    // Simulating API call with setTimeout
    setTimeout(() => {
      setFAQItems(transactionMock.faqItems);
    }, 0);
  }, []);

  return faqItems;
};

// Atomic Components
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="desktop:text-right text-center text-black font-black tablet:text-[30px] tablet:leading-[50px] leading-[31px] text-xl">
    {children}
  </h2>
);

const FAQItem = ({ item }: { item: FAQItem }) => (
  <AccordionItem
    key={item.value}
    value={item.value}
    className="border-[1px] border-solid border-[#F1F1F1] rounded-[15px] desktop:py-[16px] tablet:py-[8px] py-[2px]"
  >
    <AccordionTrigger className="font-medium desktop:text-[18px] desktop:leading-[28px] tablet:text-[14px] tablet:leading-[22px] leading-[18.78px] text-xs text-right">
      {item.question}
    </AccordionTrigger>
    <AccordionContent className="py-[14px] pr-[28px] pl-[18px] font-normal desktop:text-[16px] tablet:text-[14px] tablet:leading-[32px] leading-[24px] text-xs">
      <div className="text-justify font-normal desktop:text-[16px] desktop:leading-[32px] tablet:text-[14px] tablet:leading-[32px] leading-[28px] text-xs">
        {item.answer}
      </div>
    </AccordionContent>
  </AccordionItem>
);

const FAQSection = () => {
  const faqItems = useFAQData();

  return (
    <div className="w-full tablet:pt-[50px] pt-[30px]">
      <Accordion
        type="single"
        collapsible
        className="w-full flex flex-col desktop:gap-[15px] tablet:gap-[24px] gap-[18px]"
      >
        {faqItems.map((item) => (
          <FAQItem key={item.value} item={item} />
        ))}
      </Accordion>
    </div>
  );
};

const InterestSection = ({ name }: { name: string }) => (
  <div className="bg-[#F8F9FA] rounded-[15px] tablet:py-[15px] tablet:pr-[77px] tablet:pl-[38px] desktop:pr-[108px] desktop:pl-[77px] pt-[49px] px-[44px] pb-[31px] flex flex-col-reverse tablet:flex-row justify-center items-center desktop:gap-x-[38px] tablet:gap-x-[29px] gap-[24px] desktop:mt-[58px] tablet:mt-[53px] mt-[38px]">
    <Image
      src={transactionMock.PicUrl2}
      alt="Cryptocurrency illustration"
      className="w-[196px] h-[196px] tablet:h-[265px] tablet:w-[265px] desktop:h-[337px] desktop:w-[337px] object-cover"
      width={337}
      height={337}
    />
    <div className="flex flex-col justify-between tablet:items-start items-center desktop:gap-y-[43px] tablet:gap-y-[26px] gap-y-[17px]">
      <h4 className="desktop:text-right text-center text-black font-black desktop:text-[28px] desktop:leading-[44px] tablet:text-[20px] tablet:leading-[32px] leading-[25px] text-base">
        علاقه مند به خرید {name} هستید؟
      </h4>
      <p className="desktop:text-right text-center text-black font-light desktop:text-[22px] desktop:leading-[38px] tablet:text-[16px] tablet:leading-[32px] leading-[24px] text-xs tablet:text-right">
        ما اینجا هستیم تا شما تجربه ای متفاوت از خرید و فروش {name} داشته باشید.
      </p>
      <Link
        href="/login"
        className="bg-[#1652F0] text-white text-center rounded-[50px] font-bold text-[16px] leading-[25px] flex items-center justify-center w-[182px] h-[47px] tablet:p-[16px]"
      >
        اکنون شروع کنید
      </Link>
    </div>
  </div>
);

// Main Component
export default function TransactionQuestionComponent({
  name = "",
}: TransactionQuestionComponentProps) {
  return (
    <div className="w-full desktop:pt-[108px] tablet:pt-[117px] pt-[78px]">
      <SectionTitle>سوالات متداول</SectionTitle>
      <FAQSection />
      <InterestSection name={name} />
    </div>
  );
}
