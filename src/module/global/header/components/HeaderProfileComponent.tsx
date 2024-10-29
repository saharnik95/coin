import Image from "next/image";
import Link from "next/link";
import { headerMock } from "@/module/mock/header/header";

const HeaderProfileComponent: React.FC = () => {
  return (
    <div className="flex justify-between tablet:gap-x-[16px] desktop:gap-x-[28px] ">
      {/*Phone*/}

      <div className=" flex-row items-center justify-between hidden desktop:flex  tablet:gap-x-[4px] desktop:gap-x-[13px] ">
        <div>
          <Image
            src="/images/header/phone/phone.svg"
            alt={"phone"}
            className={" w-[16px] h-[16px] tablet:w-[20px] tablet:h-[20px]"}
            width={24}
            height={24}
          />
        </div>

        <div>
          <h6 className="text-black font-normal desktop:text-base text-sm">
            021-91008590
          </h6>
        </div>
      </div>

      {/*ProfilePic and Name*/}
      <div className=" flex flex-row justify-between items-center tablet:gap-x-[10px] gap-x-[8px]">
        <Image
          src={headerMock.profiles[0].imageUrl}
          alt={headerMock.profiles[0].name}
          className={
            " w-[30px] h-[30px] tablet:w-[26px] tablet:h-[26px] rounded-full"
          }
          width={20}
          height={20}
        />
        <h6 className="text-black font-medium desktop:text-base text-sm">
          {headerMock.profiles[0].name}
        </h6>

        <Image
          src="/images/header/arrow/arrow.svg"
          alt={"phone"}
          className={" w-[8px] h-[4px]"}
          width={24}
          height={24}
        />
      </div>
    </div>
  );
};

export default HeaderProfileComponent;
