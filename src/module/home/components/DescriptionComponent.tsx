import Image from "next/image";
import Link from "next/link";
import { homeMock } from "@/module/mock/home/home";

const DescriptionComponent: React.FC = () => {
  return (
    <div className="flex flex-col ">
      <h4
        className="desktop:mb-[40px] tablet:mb-[25px] mb-[19px] text-right text-black 
      font-black tablet:text-2xl  tablet:leading-[38px] leading-[31px] text-xl  "
      >
        توضیحات کلی در مورد رمز ارزها
      </h4>
      <p className="font-normal desktop:text-base desktop:leading-[32px] tablet:text-sm tablet:leading-[28px] leading-[24px] text-xs text-justify ">
        {homeMock.Firstabout}
      </p>

      <div className="flex justify-center items-center desktop:py-[66px] tablet:py-[53px] py-[26px] ">
        <Image
          src={homeMock.PicUrl}
          alt={"pic"}
          className={
            " w-[325px] h-[335px] tablet:w-[731px] tablet:h-[411px] desktop:w-[750px] desktop:h-[422px] "
          }
          width={325}
          height={335}
        />
      </div>

      <p className="font-normal desktop:text-base desktop:leading-[32px] tablet:text-sm tablet:leading-[28px] leading-[24px] text-xs text-justify ">
        {homeMock.Seconstabout}
      </p>
    </div>
  );
};

export default DescriptionComponent;
