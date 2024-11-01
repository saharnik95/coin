import Image from "next/image";
import Link from "next/link";
import { headerMock } from "@/module/mock/header/header";
import HeaderProfileComponent from "./components/HeaderProfileComponent";
import HeaderMenuComponent from "./components/HeaderMenuComponent";

const HeaderComponent: React.FC = () => {
  return (
    <div className="flex justify-between items-center bg-[#F8F9FA] desktop:basis-[104px] tablet:basis-[92px] basis-[64px] desktop:px-[150px] desktop:py-[40px] p-[20px] ">
      <div className="flex flex-row-reverse tablet:flex-row gap-x-[10.26px] tablet:gap-x-[27px] desktop:gap-x-[47px]">
        {/*Logo*/}
        <div className=" flex items-center">
          <Link href={"/"} target={"_blank"}>
            <Image
              src={headerMock.logoUrl}
              alt={"logo"}
              className={" w-[58px] h-[28px] tablet:w-[109px] tablet:h-[53px] "}
              width={20}
              height={20}
            />
          </Link>
        </div>
        <div className=" flex items-center">
          <HeaderMenuComponent />
        </div>
      </div>

      <div className="">
        <HeaderProfileComponent />
      </div>
    </div>
  );
};

export default HeaderComponent;
