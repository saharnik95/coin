import Image from "next/image";
import Link from "next/link";
import { headerMock } from "@/module/mock/header/header";
import HeaderProfileComponent from "./components/HeaderProfileComponent";
import HeaderMenuComponent from "./components/HeaderMenuComponent";
import { useMemo } from "react";

// Custom hook for header data
const useHeaderData = () => {
  return useMemo(
    () => ({
      logoUrl: headerMock.logoUrl,
    }),
    []
  );
};

const HeaderComponent: React.FC = () => {
  const { logoUrl } = useHeaderData();

  return (
    <div className="w-full bg-[#F8F9FA]">
      <div className="flex justify-between items-center max-w-[1140px] mx-auto desktop:px-0 desktop:basis-[104px] tablet:basis-[92px] basis-[64px]  desktop:py-[40px] p-[20px] ">
        <div className="flex flex-row-reverse tablet:flex-row gap-x-[10.26px] tablet:gap-x-[27px] desktop:gap-x-[47px]">
          {/*Logo*/}
          <div className="flex items-center">
            <Link href="/" target="_blank">
              <Image
                src={logoUrl}
                alt="logo"
                className="w-[58px] h-[28px] tablet:w-[109px] tablet:h-[53px]"
                width={109}
                height={53}
              />
            </Link>
          </div>
          <div className="flex items-center">
            <HeaderMenuComponent />
          </div>
        </div>

        <div className="">
          <HeaderProfileComponent />
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
