import Image from "next/image";
import { homeMock } from "@/module/mock/home/home";

export default function DescriptionComponent() {
  return (
    <div className="flex flex-col">
      <h4 className="mb-[19px] text-right text-black font-black text-xl leading-[31px] tablet:mb-[25px] tablet:text-2xl tablet:leading-[38px] desktop:mb-[40px]">
        توضیحات کلی در مورد رمز ارزها
      </h4>
      <p className="text-justify text-xs leading-[24px] font-normal tablet:text-sm tablet:leading-[28px] desktop:text-base desktop:leading-[32px]">
        {homeMock.Firstabout}
      </p>

      <div className="flex justify-center items-center pt-[26px] pb-[40px] tablet:py-[53px] desktop:py-[66px]">
        <Image
          src={homeMock.PicUrl}
          alt="Cryptocurrency illustration"
          className="w-[335px] h-[325px] object-cover rounded-[30px] tablet:w-[731px] tablet:h-[411px] desktop:w-[750px] desktop:h-[422px]"
          width={750}
          height={422}
        />
      </div>

      <p className="text-justify text-xs leading-[24px] font-normal tablet:text-sm tablet:leading-[28px] desktop:text-base desktop:leading-[32px]">
        {homeMock.Secondabout}
      </p>
    </div>
  );
}
