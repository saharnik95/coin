import Image from "next/image";
import React from "react";
import { transactionMock } from "@/module/mock/transaction/transaction";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface TransactionQuestionComponentProps {
  name?: string; // Optional to handle undefined values
}
const TransactionQuestionComponent: React.FC<
  TransactionQuestionComponentProps
> = ({ name }) => {
  return (
    <div className="w-full tablet:pt-[108px] pt-[50px]  ">
      <h2
        className="desktop:text-right text-center  text-black 
font-black tablet:text-[30px]  tablet:leading-[50px] leading-[31px] text-xl "
      >
        سوالات متداول
      </h2>

      <div className="w-full tablet:pt-[50px] pt-[30px] ">
        <Accordion
          type="single"
          collapsible
          className="w-full flex flex-col tablet:gap-[24px] gap-[18px]"
        >
          <AccordionItem
            value="item-1 "
            className="border-[1px] border-solid border-[#F1F1F1] rounded-[15px] desktop:py-[16px] tablet:py-[8px] py-[2px] "
          >
            <AccordionTrigger className="font-medium tablet:text-[18px] tablet:leading-[28px] leading-[25px] text-base ">
              رمز ارز چیست؟
            </AccordionTrigger>
            <AccordionContent
              className="py-[14px] pr-[28px] pl-[18px] 
            font-normal desktop:text-[16px] tablet:text-[14px] tablet:leading-[32px] leading-[24px] text-xs
            "
            >
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
              نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
              کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
              جامعه و
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-2"
            className="border-[1px] border-solid border-[#F1F1F1] rounded-[15px] desktop:py-[16px] tablet:py-[8px] py-[2px]"
          >
            <AccordionTrigger className="font-medium tablet:text-[18px] tablet:leading-[28px] leading-[25px] text-base ">
              آیا می توانم با کارت بانکی بیت کوین بخرم؟
            </AccordionTrigger>
            <AccordionContent
              className="py-[14px] pr-[28px] pl-[18px] 
            font-normal desktop:text-[16px] tablet:text-[14px] tablet:leading-[32px] leading-[24px] text-xs
            "
            >
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
              نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
              کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
              جامعه و
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-3"
            className="border-[1px] border-solid border-[#F1F1F1] rounded-[15px] desktop:py-[16px] tablet:py-[8px] py-[2px]"
          >
            <AccordionTrigger className="font-medium tablet:text-[18px] tablet:leading-[28px] leading-[25px] text-base ">
              چرا باید از والت استفاده کنم؟
            </AccordionTrigger>
            <AccordionContent
              className="py-[14px] pr-[28px] pl-[18px] 
            font-normal desktop:text-[16px] tablet:text-[14px] tablet:leading-[32px] leading-[24px] text-xs
            "
            >
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
              نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
              کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
              جامعه و
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div
        className="bg-[#F8F9FA] rounded-[15px] tablet:py-[15px] tablet:px-[77px] desktop:px-[38px] p-[44px] flex flex-col tablet:flex-row justify-center items-center desktop:gap-x-[38px] tablet:gap-x-[29px] gap-[24px]
      tablet:mt-[60px] mt-[40px] "
      >
        <Image
          src={transactionMock.PicUrl2}
          alt={"pic"}
          className={
            " w-[196px] h-[196px]   tablet:h-[265px] tablet:w-[265px] desktop:h-[337px] desktop:w-[337px] "
          }
          width={196}
          height={196}
        />

        <div className="flex flex-col justify-between tablet:items-start items-center  desktop:gap-y-[43px] tablet:gap-y-[26px]  gap-y-[18px] ">
          <h4
            className="desktop:text-right text-center  text-black 
font-black desktop:text-[28px] desktop:leading-[44px] tablet:text-[20px] tablet:leading-[32px] leading-[25px] text-base "
          >
            علاقه مند به خرید {name} هستید؟
          </h4>
          <p
            className="desktop:text-right text-center  text-black 
font-light desktop:text-[22px] desktop:leading-[38px] tablet:text-[16px] tablet:leading-[32px] leading-[24px] text-xs "
          >
            ما اینجا هستیم تا شما تجربه ای متفاوت از خرید و فروش {name} داشته
            باشید.
          </p>
          <Link
            href={`/transaction/login`}
            className="bg-[#1652F0] text-white text-center rounded-[50px] font-bold text-[16px] leading-[25px]  flex items-center justify-center w-[182px] h-[47px] tablet:p-[16px] "
          >
            اکنون شروع کنید
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TransactionQuestionComponent;
