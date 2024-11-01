"use client";
import { transactionMock } from "@/module/mock/transaction/transaction";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

// Define the shape of your form data
interface ProfileFormValues {
  firstCurrency: number;
  SecondCurrency: string;
}

// Create a Zod schema for validation
const formSchema = z.object({
  firstCurrency: z.string().regex(/^\d+$/, {
    message: "باید یک عدد باشد.", // Error message for invalid number
  }),
  email: z.string().email({
    message: "لطفا انتخاب کنید.",
  }),
});

export default function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstCurrency: 0,
      SecondCurrency: "", // Initial value for email
    },
  });

  const onSubmit: SubmitHandler<ProfileFormValues> = (data) => {
    console.log(data); // Handle form submission
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col w-full justify-between desktop:gap-[18px] gap-3 " // Change to flex-col for vertical stacking
      >
        <h5 className="text-black  font-semibold desktop:text-[16px] desktop:leading-[25px]  leading-[22px] text-[14px] ">
          ارسال می کنید:
        </h5>
        <div className="flex flex-row space-x-4 w-full">
          {" "}
          {/* Flexbox for horizontal alignment */}
          <FormField
            control={form.control}
            name="firstCurrency"
            render={({ field }) => (
              <FormItem className="border-none w-full">
                <FormControl className="border-none w-full ">
                  <input
                    className="border-none ring-none w-full p-3 text-[#696464]  tablet:leading-[22px] leading-[18px] tablet:text-[14px] text-[12px] h-[47px] desktop:rounded-r-[50px] rounded-r-[8px] desktop:bg-[#F6F4F4] bg-[#F8F9FA] ring-0 focus:border-none"
                    placeholder="مقدار را وارد کنید"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="SecondCurrency" // Corrected name to email
            render={({ field }) => (
              <FormItem className="border-none w-full">
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className="">
                    <SelectTrigger className=" border-r border-[1px] border-solid border-[#9b9b9b]  border-l-0 border-t-0 border-b-0   w-full p-3 text-[#696464]  tablet:leading-[22px] leading-[18px] tablet:text-[14px] text-[12px] h-[47px] desktop:rounded-l-[50px] rounded-l-[8px] rounded-r-0 desktop:bg-[#F6F4F4] bg-[#F8F9FA] ring-0 ">
                      <SelectValue placeholder="تومان" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {transactionMock.FirstCurrencies.map((currency) => (
                      <SelectItem
                        key={currency.id}
                        value={currency.name}
                        className="w-full flex-row-reverse items-center space-x-2" // Add spacing between image and text
                      >
                        <div className="flex-row">
                          <Image
                            src={currency.imageUrl}
                            alt={currency.name}
                            className={"w-[26px] h-[26px]"} // Adjust size if necessary
                            width={20}
                            height={20}
                          />
                          <div className="w-3">{currency.name}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Image Below the Form Fields */}
        <div className="flex w-full justify-end">
          <div className="rounded-full justify-self-end flex bg-[#E8E8E8] justify-center items-center w-[40px] h-[40px]">
            <Image
              src="/images/transaction/form/Ellipse 48.svg"
              alt={"flash"}
              className={"w-[14px] h-[13px]"}
              width={20}
              height={20}
            />
          </div>
        </div>

        <h5 className="text-black  font-semibold desktop:text-[16px] desktop:leading-[25px]  leading-[22px] text-[14px] ">
          دریافت می کنید:
        </h5>

        <div className="flex flex-row space-x-4">
          {" "}
          <FormField
            control={form.control}
            name="firstCurrency"
            render={({ field }) => (
              <FormItem className="border-none w-full">
                <FormControl className=" w-full  border-l border-[1px] border-solid border-[#9b9b9b]  border-r-0 border-t-0 border-b-0 ">
                  <div className=" ring-none w-full p-3 text-[#696464]  tablet:leading-[22px] leading-[18px] tablet:text-[14px] text-[12px] h-[47px] desktop:rounded-r-[50px] rounded-r-[8px] desktop:bg-[#F6F4F4] bg-[#F8F9FA] ring-0 focus:border-none">
                    "مقدار نهایی "
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="SecondCurrency"
            render={({ field }) => (
              <FormItem className="border-none w-full ">
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-none  w-full p-3 text-[#696464]  tablet:leading-[22px] leading-[18px] tablet:text-[14px] text-[12px] h-[47px] desktop:rounded-l-[50px] rounded-l-[8px] desktop:bg-[#F6F4F4] bg-[#F8F9FA] ring-0 focus:border-none">
                      <SelectValue placeholder="بیت کوین" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="بیت کوین">بیت کوین</SelectItem>
                    <SelectItem value="اتریوم">اتریوم</SelectItem>
                    <SelectItem value="سولانا">سولانا</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row justify-between ">
          <h5 className="text-black  font-semibold desktop:text-[16px] desktop:leading-[25px]  leading-[22px] text-[14px] ">
            نرخ ارز یک
          </h5>

          <h5 className="text-black  font-semibold desktop:text-[16px] desktop:leading-[25px]  leading-[22px] text-[14px] ">
            {" "}
            5.600 دلار
          </h5>
        </div>
        <div className="flex flex-row justify-between ">
          <h5 className="text-black  font-semibold desktop:text-[16px] desktop:leading-[25px]  leading-[22px] text-[14px] ">
            نرخ ارز دو
          </h5>

          <h5 className="text-black  font-semibold desktop:text-[16px] desktop:leading-[25px]  leading-[22px] text-[14px] ">
            {" "}
            49.750 تومان{" "}
          </h5>
        </div>

        {/* Submit Button Below the Image */}
        <Button className="mt-4 h-[47px] bg-white ring-1 ring--[#0D1A8E] text-[#0D1A8E] border-[#0D1A8E] border-1px border-solid desktop:rounded-[50px] rounded-[8px] hover:bg-[#1652F0] hover:text-white">
          ادامه خرید
        </Button>
      </form>
    </Form>
  );
}
