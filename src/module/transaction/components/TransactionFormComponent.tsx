import Image from "next/image";
import React from "react";
import Formschema from "@/module/transaction/components/Formschema";

interface TransactionFormComponentProps {
  name?: string;
  code?: string;
  change?: number;
  buy?: number;
  sell?: number;
  usd?: number;
  value?: number;
}
function formatNumberWithCommas(number: number) {
  if (isNaN(number)) return number;

  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
const TransactionFormComponent: React.FC<TransactionFormComponentProps> = ({
  name,
  code,
  change,
  buy,
  sell,
  usd,
  value,
}) => {
  return (
    <div className=" bg-white shadow-custom w-full rounded-[30px] flex flex-col tablet:flex-row desktop:py-[29px] desktop:px-[33px] tablet:py-[45px] tablet:px-[25px] py-[32px] px-[22px] desktop:gap-[45px] tablet:gap-[28px] gap-[26px]">
      <div className="flex flex-col desktop:gap-x-[27px] tablet:gap-x-[32px] gap-y-[25px] w-full justify-between ">
        <div className=" flex-flex-row">
          <h5 className="text-black  font-semibold desktop:text-[16px] desktop:leading-[25px]  leading-[22px] text-[14px] ">
            قیمت لحظه ای :
          </h5>
        </div>

        <div className=" flex flex-row  justify-between desktop:gap-[155px] tablet:gap-[53px] gap-[43px]">
          <div className="flex flex-row">
            <div>
              <Image
                src="/images/home/table/currencies/bitcoin.svg"
                alt={"bitcoin"}
                className={
                  "desktop:w-[73px] desktop:h-[73px] tablet:w-[61px] tablet:h-[61px] w-[43px] h-[43px] pl-[6px] desktop:pl-[8px]"
                }
                width={20}
                height={20}
              />
            </div>
            <div className="flex flex-col items-center justify-between  gap-2">
              <h5 className="text-black  font-semibold desktop:text-[16px] desktop:leading-[25px]  leading-[22px] text-[14px] ">
                {" "}
                {name}
              </h5>
              <h6 className="text-[#696464]  leading-[22px] text-[14px] ">
                {code}
              </h6>
            </div>
          </div>
          <div className="flex flex-col  justify-between gap-2">
            <h5 className="text-black  font-semibold desktop:text-[16px] desktop:leading-[25px]  leading-[22px] text-[14px] ">
              {formatNumberWithCommas(value ?? 0)} تومان
            </h5>
            <h5 className="text-[#696464]  leading-[22px] text-[14px] text-left ">
              ${formatNumberWithCommas(usd ?? 0)}
            </h5>
          </div>
        </div>

        <div className=" flex flex-row  justify-between desktop:gap-[155px] border-t-[1px] desktop:pt-[36px] tablet:pt-[17px] pt-[24px]">
          <h5 className="text-black  font-normal desktop:text-[16px] desktop:leading-[2px]  leading-[18px] text-[12px] ">
            {" "}
            تغییر قیمت امروز :
          </h5>
          <h5
            dir="ltr"
            className={`font-normal desktop:text-[16px] desktop:leading-[2px]  leading-[18px] text-[12px] ${
              (change ?? 0) > 0 ? "text-[#147D03]" : "text-[#EF4040]"
            } `}
          >
            {change}%
          </h5>
        </div>

        <div className=" flex flex-row  justify-between desktop:gap-[155px]">
          <h5 className="text-black  font-normal desktop:text-[16px] desktop:leading-[2px]  leading-[18px] text-[12px] ">
            {" "}
            خرید {name} :
          </h5>
          <h5 className="text-[#147D09]   font-normal desktop:text-[16px] desktop:leading-[2px]  leading-[18px] text-[12px] ">
            {formatNumberWithCommas(buy ?? 0)} تومان
          </h5>
        </div>
        <div className=" flex flex-row  justify-between desktop:gap-[155px]">
          <h5 className=" text-black  font-normal desktop:text-[16px] desktop:leading-[2px]  leading-[18px] text-[12px] ">
            {" "}
            فروش {name} :
          </h5>
          <h5 className=" text-[#FF6868] font-normal desktop:text-[16px] desktop:leading-[2px]  leading-[18px] text-[12px] ">
            {formatNumberWithCommas(sell ?? 0)} تومان
          </h5>
        </div>

        <div className=" flex flex-row  justify-between desktop:gap-[155px]">
          <h5 className="text-black  font-normal desktop:text-[16px] desktop:leading-[2px]  leading-[18px] text-[12px] ">
            {" "}
            بالاترین قیمت 24 ساعته :
          </h5>
          <h5 className="text-[#147D09]   font-normal desktop:text-[16px] desktop:leading-[2px]  leading-[18px] text-[12px] ">
            {formatNumberWithCommas(buy ?? 0)} تومان
          </h5>
        </div>

        <div className=" flex flex-row  justify-between desktop:gap-[155px]">
          <h5 className=" text-black  font-normal desktop:text-[16px] desktop:leading-[2px]  leading-[18px] text-[12px] ">
            {" "}
            پایین ترین قیمت 24 ساعته :
          </h5>
          <h5 className="text-[#FF6868]  font-normal desktop:text-[16px] desktop:leading-[2px]  leading-[18px] text-[12px] ">
            {formatNumberWithCommas(buy ?? 0)} تومان
          </h5>
        </div>
      </div>
      <div
        className=" tablet:w-[1px]  tablet:border-r-[1px]  tablet:border-r-[#EBEBEB] tablet:border-t-[0] border-solid
              border-t-[1px]
       "
      ></div>
      <div className=" w-full ">
        <Formschema></Formschema>
      </div>
    </div>
  );
};

export default TransactionFormComponent;
