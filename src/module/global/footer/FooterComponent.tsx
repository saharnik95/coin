import { footerMock } from "@/module/mock/footer/footer";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const FooterComponent: React.FC = () => {
  return (
    <footer
      className="bg-[#1B2A4E] basis-[579px] tablet:basis-[357px] desktop:basis-[402px]
    desktop:px-[150px] tablet:px-[50px] px-[18px] desktop:pt-[42px] tablet:pt-[52px] pt-[56px] pb-[24px] desktop:pb-[34px] 
    flex flex-col
    "
    >
      <div className="flex tablet:flex-row flex-col justify-between desktop:gap-x-[38px] tablet:gap-x-[33px] gap-y-[22px] desktop:pb-[40px] pb-[30px]">
        {/*Logo and About*/}
        <div className="flex flex-col justify-between gap-y-[16px] tablet:gap-y-[23px] desktop:gap-y-[14px] ">
          <Link
            href={"/"} // Adjust the href for home
          >
            <Image
              src={footerMock.logoUrl}
              alt={"logo"}
              className={
                " w-[110px] h-[53px] tablet:w-[132px] tablet:h-[64px] "
              }
              width={20}
              height={20}
            />
          </Link>
          <p className=" text-white font-normal desktop:text-base text-xs leading-[24px] desktop:leading-[30px] text-justify desktop:max-w-[352px] tablet:max-w-[253px] ">
            {footerMock.about}
          </p>
        </div>

        <div className="w-full border-t  border-[#374566] tablet:border-none flex justify-evenly tablet:gap-x-[80px] gap-x-[36px] pt-[22px] tablet:pt-0 ">
          {/*Connected Links*/}

          <div className="flex flex-col h-full justify-between ">
            <h3 className="text-white font-black desktop:text-xl table:text-base text-sm  text-nowrap text-right mb-[24px] tablet:mb-[31px] desktop:mb-[25px]">
              لینک های مرتبط
            </h3>
            <section className="grid grid-cols-2 gap-y-[15px] gap-x-[50px] tablet:gap-x-[100px] h-full  ">
              {footerMock.conectedLinks.map(({ id, name, alt }) => (
                <div key={id} className="flex items-end">
                  <Link
                    href={alt === "صفحه اصلی" ? "/" : `/${alt}`}
                    className="inline-block"
                  >
                    <h4 className="text-white font-normal desktop:text-base text-xs text-nowrap text-right">
                      {name}
                    </h4>
                  </Link>
                </div>
              ))}
            </section>
          </div>

          {/*Currency Share*/}
          <div className="flex flex-col h-full justify-between ">
            <h3 className="text-white font-black desktop:text-xl desktop:leading-[31px] tablet:leading-[25px] leading-[21px] tablet:text-base text-sm text-nowrap text-right mb-[24px] tablet:mb-[31px] desktop:mb-[25px]">
              تبادل ارز
            </h3>
            <section className="grid grid-cols-1 tablet:grid-cols-2 gap-y-[15px] gap-x-[50px] tablet:gap-x-[100px] h-full">
              {[
                ...footerMock.currencyShare.slice(0, 1), // item at index 0
                ...footerMock.currencyShare.slice(2, 3), // item at index 2
                ...footerMock.currencyShare.slice(4, 5), // item at index 4
                ...footerMock.currencyShare.slice(6, 7), // item at index 6
              ].map(({ id, name, alt }) => (
                <div key={id} className="flex items-end">
                  <Link
                    href={
                      alt === "صفحه اصلی"
                        ? "/"
                        : `http://localhost:3000/transaction/${alt}`
                    }
                    className="inline-block"
                  >
                    <h4 className="text-white font-normal desktop:text-base text-xs desktop:leading-[25px] leading-[18.78px] text-nowrap text-right">
                      خرید {name}
                    </h4>
                  </Link>
                </div>
              ))}
              {footerMock.currencyShare.length > 4 &&
                footerMock.currencyShare.slice(4).map(({ id, name }) => (
                  <div key={id} className="hidden tablet:flex items-end">
                    <Link
                      href={`http://localhost/${name}`}
                      target="_blank"
                      className="inline-block"
                    >
                      <h4 className="text-white font-normal desktop:text-base text-xs desktop:leading-[25px] leading-[18.78px] text-nowrap text-right">
                        خرید {name}
                      </h4>
                    </Link>
                  </div>
                ))}
            </section>
          </div>
        </div>
      </div>

      <div className=" flex flex-col-reverse justify-between tablet:flex-row border-t  border-[#374566] desktop:pt-[22px] tablet:pt-[18px] pt-[12px]">
        <div className=" border-t  border-[#374566] tablet:border-none mt-[12px]">
          <p className=" text-white font-normal desktop:text-base desktop:leading-[25px] leading-[18.78px] text-xs text-nowrap text-center tablet:text-right mt-[12px]">
            تمامی حقوق این سرویس متعلق به مجموعه{" "}
            <span className=" text-white font-bold desktop:text-base text-xs text-nowrap text-center tablet:text-right">
              {"  "}ری پیمنت{"  "}
            </span>
            است
          </p>
        </div>

        {/*socials*/}
        <div
          className={
            "flex w-full tablet:justify-end justify-evenly gap-[18px] tablet:gap-[28px] "
          }
        >
          {footerMock.socials.map(({ id, iconUrl, url, alt }) => {
            return (
              <Link key={id} href={url} target={"_blank"}>
                <Image
                  src={iconUrl}
                  alt={alt}
                  className={
                    " w-[32px] h-[32px] desktop:w-[50px] desktop:h-[50px] "
                  }
                  width={20}
                  height={20}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
