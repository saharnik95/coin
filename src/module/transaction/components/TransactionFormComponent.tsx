"use client";

import React from "react";
import Image from "next/image";
import Formschema from "@/module/transaction/components/Formschema";

// Types
interface TransactionFormComponentProps {
  name?: string;
  code: string;
  change?: number;
  buy?: number;
  sell?: number;
  usd?: number;
  value?: number;
  pic: string;
}

// Custom Hooks
const useFormattedNumber = () => {
  const formatNumberWithCommas = (number: number) => {
    if (isNaN(number)) return number;
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  return formatNumberWithCommas;
};

// Atomic Components
const PriceInfo = ({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) => (
  <div className="flex flex-row justify-between desktop:gap-[155px] pt-[10px] tablet:pt-[12px] desktop:pt-[10px]">
    <h5 className="text-black font-normal desktop:text-[16px] desktop:leading-[24px] leading-[18px] text-[12px]">
      {label}
    </h5>
    <h5
      className={`font-normal desktop:text-[16px] desktop:leading-[24px] leading-[18px] text-[12px] ${className}`}
    >
      {value}
    </h5>
  </div>
);

const CoinInfo = ({
  name,
  code,
  pic,
  value,
  usd,
}: {
  name: string;
  code: string;
  pic: string;
  value: number;
  usd: number;
}) => {
  const formatNumberWithCommas = useFormattedNumber();
  return (
    <div className="flex flex-row justify-between desktop:gap-[155px] tablet:gap-[53px] gap-[43px] mb-[8px] tablet:mb-[1px]">
      <div className="flex flex-row justify-center items-center">
        <div className="flex flex-row justify-center items-center pl-[6px] desktop:pl-[8px]">
          <Image
            src={pic}
            alt={code}
            className="object-cover rounded-full desktop:w-[73px] desktop:h-[73px] tablet:w-[57px] tablet:h-[57px] w-[43px] h-[43px]"
            width={73}
            height={73}
          />
        </div>
        <div className="flex flex-col justify-between gap-2">
          <h5 className="text-black text-right font-semibold desktop:text-[16px] desktop:leading-[25px] leading-[22px] text-[14px] text-wrap">
            {name}
          </h5>
          <h6 className="text-[#696464] desktop:leading-[28px] desktop:text-[18px] text-[14px] leading-[22px] text-right">
            {code}
          </h6>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-2">
        <h5 className="text-black text-left font-semibold desktop:text-[16px] desktop:leading-[25px] leading-[22px] text-[14px] text-nowrap">
          {formatNumberWithCommas(value)} تومان
        </h5>
        <h5 className="text-[#696464] desktop:leading-[27px] desktop:text-[18px] leading-[22px] text-[14px] text-left">
          ${formatNumberWithCommas(usd)}
        </h5>
      </div>
    </div>
  );
};

const PriceChange = ({ change }: { change: number }) => (
  <div className="flex flex-row justify-between desktop:gap-[155px] border-t-[1px] desktop:pt-[36px] tablet:pt-[17px] pt-[24px]">
    <h5 className="text-black font-normal desktop:text-[16px] desktop:leading-[24px] leading-[18px] text-[12px]">
      تغییر قیمت امروز :
    </h5>
    <h5
      dir="ltr"
      className={`font-normal desktop:text-[16px] desktop:leading-[24px] leading-[18px] text-[12px] ${
        change > 0 ? "text-[#147D03]" : "text-[#EF4040]"
      }`}
    >
      {change}%
    </h5>
  </div>
);

// Main Component
const TransactionFormComponent: React.FC<TransactionFormComponentProps> = ({
  name = "",
  code,
  change = 0,
  buy = 0,
  sell = 0,
  usd = 0,
  value = 0,
  pic,
}) => {
  const formatNumberWithCommas = useFormattedNumber();

  return (
    <div className="bg-white shadow-custom w-full rounded-[30px] flex flex-col tablet:flex-row desktop:pt-[29px] desktop:pb-[39px] desktop:px-[33px] tablet:pt-[45px] tablet:pb-[42px] tablet:px-[25px] pt-[32px] pb-[21px] px-[22px] desktop:gap-[45px] tablet:gap-[28px] gap-[26px]">
      <div className="flex flex-col desktop:gap-x-[26px] tablet:gap-x-[28px] tablet:gap-y-[20px] gap-y-[16px] w-full justify-between">
        <div className="flex-flex-row">
          <h5 className="text-black font-semibold desktop:text-[16px] desktop:leading-[25px] leading-[22px] text-[14px]">
            قیمت لحظه ای :
          </h5>
        </div>

        <CoinInfo name={name} code={code} pic={pic} value={value} usd={usd} />
        <PriceChange change={change} />
        <PriceInfo
          label={`خرید ${name} :`}
          value={`${formatNumberWithCommas(buy)} تومان`}
          className="text-[#147D09]"
        />
        <PriceInfo
          label={`فروش ${name} :`}
          value={`${formatNumberWithCommas(sell)} تومان`}
          className="text-[#FF6868]"
        />
        <PriceInfo
          label="بالاترین قیمت 24 ساعته :"
          value={`${formatNumberWithCommas(buy)} تومان`}
          className="text-[#147D09]"
        />
        <PriceInfo
          label="پایین ترین قیمت 24 ساعته :"
          value={`${formatNumberWithCommas(buy)} تومان`}
          className="text-[#FF6868]"
        />
      </div>
      <div className="tablet:w-[1px] tablet:border-r-[1px] tablet:border-r-[#EBEBEB] tablet:border-t-[0] border-solid border-t-[1px] pt-[4px]"></div>
      <div className="w-full">
        <Formschema />
      </div>
    </div>
  );
};

export default TransactionFormComponent;
