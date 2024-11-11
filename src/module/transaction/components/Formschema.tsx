"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Control } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { transactionMock } from "@/module/mock/transaction/transaction";

// Schema definition
const formSchema = z.object({
  amount: z.number().min(0, { message: "باید یک عدد مثبت باشد." }),
  firstCurrency: z.string().nonempty({ message: "لطفا انتخاب کنید." }),
  secondCurrency: z.string().nonempty({ message: "لطفا انتخاب کنید." }),
});

type ProfileFormValues = z.infer<typeof formSchema>;

// Custom hook for form logic
const useExchangeForm = () => {
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      firstCurrency: "",
      secondCurrency: "",
    },
  });

  const onSubmit: SubmitHandler<ProfileFormValues> = (data) => {
    console.log("Form submitted with data:", data);
  };

  const calculateAmount = useCallback(() => {
    const { amount, firstCurrency, secondCurrency } = form.getValues();
    const firstCurrencyData = transactionMock.FirstCurrencies.find(
      (c) => c.name === firstCurrency
    );
    const secondCurrencyData = transactionMock.SecondCurrencies.find(
      (c) => c.name === secondCurrency
    );

    if (firstCurrencyData && secondCurrencyData) {
      const convertedAmount =
        (amount * firstCurrencyData.usd) / secondCurrencyData.usd;
      setConvertedAmount(convertedAmount);
      console.log("Amount:", amount);
      console.log("Converted Amount:", convertedAmount);
    } else {
      setConvertedAmount(null);
    }
  }, [form]);

  return { form, convertedAmount, onSubmit, calculateAmount };
};

// Atomic components
const AmountInput = ({ control }: { control: Control<ProfileFormValues> }) => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  return (
    <FormField
      control={control}
      name="amount"
      render={({ field }) => (
        <FormItem className="border-none w-full">
          <FormControl className="border-none w-full">
            <input
              {...field}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="border-none ring-none outline-none w-full p-3 text-[#696464] desktop:leading-[22px] leading-[18px] desktop:text-[14px] text-[12px] h-[47px] desktop:rounded-r-[50px] rounded-r-[8px] desktop:bg-[#F6F4F4] bg-[#F8F9FA] ring-0 focus:border-none font-light"
              placeholder={showPlaceholder ? "0" : "مقدار را وارد کنید"}
              onFocus={() => setShowPlaceholder(false)}
              onBlur={(e) => {
                if (e.target.value === "") {
                  setShowPlaceholder(true);
                }
              }}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");
                field.onChange(value === "" ? "" : Number(value));
              }}
              value={field.value === 0 && showPlaceholder ? "" : field.value}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const CurrencySelect = ({
  control,
  name,
  currencies,
  defaultImage,
  defaultText,
}: {
  control: Control<ProfileFormValues>;
  name: "firstCurrency" | "secondCurrency";
  currencies:
    | typeof transactionMock.FirstCurrencies
    | typeof transactionMock.SecondCurrencies;
  defaultImage: string;
  defaultText: string;
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="border-none w-full">
          <Select
            onValueChange={(value) => {
              console.log(`Selected ${name}:`, value);
              field.onChange(value);
            }}
            value={field.value}
          >
            <FormControl className="w-full flex">
              <SelectTrigger className="border-0 pt-3 justify-between w-full p-3 text-[#696464] tablet:leading-[22px] leading-[18px] tablet:text-[14px] text-[12px] h-[47px] desktop:rounded-l-[50px] rounded-l-[8px] rounded-r-0 desktop:bg-[#F6F4F4] bg-[#F8F9FA] ring-0 focus:border-l-0 focus:border-t-0 focus:border-b-0">
                <div className="flex gap-[9px] desktop:gap-[11px]">
                  <div className="h-[37px] w-[1px] bg-[#9b9b9b]"></div>
                  <div className="flex flex-row gap-[8px] tablet:gap-[5px] desktop:gap-[10px] items-center">
                    {!field.value && (
                      <Image
                        src={defaultImage}
                        alt="currency"
                        className="w-[26px] h-[26px] object-cover"
                        width={26}
                        height={26}
                      />
                    )}
                    <SelectValue
                      placeholder={defaultText}
                      className="text-[#696464] font-light desktop:leading-[22px] desktop:text-[14px] leading-[12px] text-[12px]"
                    />
                  </div>
                </div>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.id} value={currency.name}>
                  <div className="w-full flex flex-row gap-[10px] justify-between items-center">
                    <div className="rounded-full flex justify-center items-center w-[43px] h-[26px]">
                      <Image
                        src={currency.imageUrl}
                        alt={currency.name}
                        className="w-[26px] h-[26px] object-cover"
                        width={26}
                        height={26}
                      />
                    </div>
                    <div className="text-nowrap">{currency.name}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const CalculateButton = ({ onClick }: { onClick: () => void }) => (
  <div
    className="rounded-full cursor-pointer justify-self-end flex bg-[#E8E8E8] justify-center items-center w-[40px] h-[40px]"
    onClick={onClick}
  >
    <Image
      src="/images/transaction/form/Ellipse 48.svg"
      alt="flash"
      className="w-[14.4px] h-[13.54px] object-cover"
      width={14}
      height={13}
    />
  </div>
);

const ConvertedAmountDisplay = ({ amount }: { amount: number | null }) => (
  <div className="ring-none w-full p-3 text-[#696464] font-light tablet:leading-[22px] leading-[18px] desktop:text-[14px] text-[12px] h-[47px] desktop:rounded-r-[50px] rounded-r-[8px] desktop:bg-[#F6F4F4] bg-[#F8F9FA] ring-0 focus:border-none">
    {amount !== null ? `${amount.toFixed(2)}` : "مقدار نهایی"}
  </div>
);

const ExchangeRateDisplay = ({
  firstCurrency,
  secondCurrency,
}: {
  firstCurrency: string;
  secondCurrency: string;
}) => {
  const firstRate =
    transactionMock.FirstCurrencies.find((c) => c.name === firstCurrency)
      ?.usd || "0";
  const secondRate =
    transactionMock.SecondCurrencies.find((c) => c.name === secondCurrency)
      ?.usd || "0";

  return (
    <>
      <div className="flex flex-row justify-between desktop:pt-[7px] pt-1">
        <h5 className="text-black font-semibold desktop:text-[16px] desktop:leading-[25px] leading-[22px] text-[14px]">
          نرخ ارز یک
        </h5>
        <h5 className="text-black font-semibold desktop:text-[16px] desktop:leading-[25px] leading-[22px] text-[14px]">
          {firstRate} دلار
        </h5>
      </div>
      <div className="flex flex-row justify-between">
        <h5 className="text-black font-semibold desktop:text-[16px] desktop:leading-[25px] leading-[22px] text-[14px]">
          نرخ ارز دو
        </h5>
        <h5 className="text-black font-semibold desktop:text-[16px] desktop:leading-[25px] leading-[22px] text-[14px]">
          {secondRate} تومان
        </h5>
      </div>
    </>
  );
};

// Main component
export default function CryptoExchangeForm() {
  const { form, convertedAmount, onSubmit, calculateAmount } =
    useExchangeForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full justify-between desktop:gap-[18px] gap-3"
      >
        <h5 className="text-black font-semibold desktop:text-[16px] desktop:leading-[25px] leading-[22px] text-[14px]">
          ارسال می کنید:
        </h5>
        <div className="flex flex-row w-full">
          <AmountInput control={form.control} />
          <CurrencySelect
            control={form.control}
            name="firstCurrency"
            currencies={transactionMock.FirstCurrencies}
            defaultImage="/images/transaction/form/iran.png"
            defaultText="تومان"
          />
        </div>

        <div className="flex w-full justify-end desktop:pt-[16px] pt-[9px]">
          <CalculateButton onClick={calculateAmount} />
        </div>

        <h5 className="text-black font-semibold desktop:text-[16px] desktop:leading-[25px] leading-[22px] text-[14px]">
          دریافت می کنید:
        </h5>

        <div className="flex flex-row">
          <ConvertedAmountDisplay amount={convertedAmount} />
          <CurrencySelect
            control={form.control}
            name="secondCurrency"
            currencies={transactionMock.SecondCurrencies}
            defaultImage="/images/transaction/form/bitcoin.png"
            defaultText="بیت کوین"
          />
        </div>

        <ExchangeRateDisplay
          firstCurrency={form.watch("firstCurrency")}
          secondCurrency={form.watch("secondCurrency")}
        />

        <Button className="mt-[19px] tablet:mt-[16px] desktop:mt-[7px] h-[47px] bg-white ring-1 ring--[#0D1A8E] text-[#0D1A8E] border-[#0D1A8E] border-1px border-solid desktop:rounded-[50px] rounded-[8px] hover:bg-[#1652F0] hover:text-white desktop:pt-2 pt-1">
          ادامه خرید
        </Button>
      </form>
    </Form>
  );
}
