import { footerMock } from "@/module/mock/footer/footer";
import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";

// Custom hook for footer data
const useFooterData = () => {
  return useMemo(
    () => ({
      logoUrl: footerMock.logoUrl,
      about: footerMock.about,
      connectedLinks: footerMock.conectedLinks,
      currencyShare: footerMock.currencyShare,
      socials: footerMock.socials,
    }),
    []
  );
};

// Atomic components
const FooterHeading = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-white font-black text-sm leading-[21px] text-nowrap text-right mb-[24px] tablet:text-base tablet:leading-[25px] tablet:mb-[31px] desktop:text-xl desktop:leading-[31px] desktop:mb-[25px]">
    {children}
  </h3>
);

const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link href={href} className="flex items-center">
    <span className="text-white font-normal text-[12px] leading-[18.78px] text-nowrap text-right desktop:text-base desktop:leading-[25px]">
      {children}
    </span>
  </Link>
);

const SocialLink = ({
  url,
  iconUrl,
  alt,
}: {
  url: string;
  iconUrl: string;
  alt: string;
}) => (
  <Link href={url} target="_blank">
    <Image
      src={iconUrl}
      alt={alt}
      className="w-[32px] h-[32px] desktop:w-[50px] desktop:h-[50px] object-cover"
      width={50}
      height={50}
    />
  </Link>
);

// Molecule components
const LogoAndAbout = () => {
  const { logoUrl, about } = useFooterData();
  return (
    <div className="flex flex-col justify-between gap-y-[16px] tablet:gap-y-[23px] desktop:gap-y-[14px]">
      <Link href="/">
        <Image
          src={logoUrl}
          alt="logo"
          className="w-[110px] h-[53px] tablet:w-[132px] tablet:h-[64px] object-cover"
          width={132}
          height={64}
        />
      </Link>
      <p className="text-white font-normal text-xs leading-[24px] text-justify tablet:max-w-[253px] desktop:text-base desktop:leading-[30px] desktop:max-w-[352px]">
        {about}
      </p>
    </div>
  );
};

const ConnectedLinks = () => {
  const { connectedLinks } = useFooterData();
  return (
    <div className="flex flex-col h-full justify-between">
      <FooterHeading>لینک های مرتبط</FooterHeading>
      <section className="grid grid-cols-2 gap-y-[15px] gap-x-[50px] h-full tablet:gap-y-[25px] tablet:gap-x-[100px] desktop:gap-y-[19px]">
        {connectedLinks.map(({ id, name, alt }) => (
          <FooterLink key={id} href={alt === "صفحه اصلی" ? "/" : `/${alt}`}>
            {name}
          </FooterLink>
        ))}
      </section>
    </div>
  );
};

const CurrencyShare = () => {
  const { currencyShare } = useFooterData();
  const visibleCurrencies = useMemo(
    () => [
      ...currencyShare.slice(0, 1),
      ...currencyShare.slice(2, 3),
      ...currencyShare.slice(4, 5),
      ...currencyShare.slice(6, 7),
    ],
    [currencyShare]
  );

  return (
    <div className="flex flex-col h-full justify-between">
      <FooterHeading>تبادل ارز</FooterHeading>
      <section className="grid grid-cols-1 gap-y-[15px] gap-x-[50px] h-full tablet:grid-cols-2 tablet:gap-y-[25px] tablet:gap-x-[100px] desktop:gap-y-[19px]">
        {visibleCurrencies.map(({ id, name, alt }) => (
          <FooterLink
            key={id}
            href={
              alt === "صفحه اصلی"
                ? "/"
                : `http://localhost:3000/transaction/${alt}`
            }
          >
            خرید {name}
          </FooterLink>
        ))}
        {currencyShare.length > 4 &&
          currencyShare.slice(4).map(({ id, name }) => (
            <FooterLink key={id} href={`http://localhost/${name}`}>
              <h4 className="text-white font-normal text-[12px] leading-[18.78px] text-nowrap text-right desktop:text-base desktop:leading-[25px] hidden tablet:block">
                خرید {name}
              </h4>
            </FooterLink>
          ))}
      </section>
    </div>
  );
};

// Organism components
const LinksAndCurrency = () => (
  <div className="border-t border-[#374566] tablet:border-none flex justify-evenly pt-[22px] tablet:pt-0 tablet:gap-x-[80px] gap-x-[36px]">
    <ConnectedLinks />
    <CurrencyShare />
  </div>
);

const BottomSection = () => {
  const { socials } = useFooterData();
  return (
    <div className="flex flex-col-reverse justify-between border-t border-[#374566] pt-[12px] tablet:flex-row tablet:pt-[18px] desktop:pt-[22px]">
      <div className="border-t flex items-center justify-center border-[#374566] mt-[12px] tablet:border-none tablet:mt-0">
        <p className="text-white font-normal text-xs leading-[18.78px] text-nowrap text-center mt-[12px] tablet:text-right tablet:mt-0 desktop:text-base desktop:leading-[25px]">
          تمامی حقوق این سرویس متعلق به مجموعه{" "}
          <span className="text-white font-bold text-xs text-nowrap text-center tablet:text-right desktop:text-base">
            {"  "}ری پیمنت{"  "}
          </span>
          است
        </p>
      </div>
      <div className="flex w-full justify-center gap-[18px] tablet:justify-end tablet:gap-[28px]">
        {socials.map(({ id, iconUrl, url, alt }) => (
          <SocialLink key={id} url={url} iconUrl={iconUrl} alt={alt} />
        ))}
      </div>
    </div>
  );
};

// Template component
export default function FooterComponent() {
  return (
    <div className="bg-[#1B2A4E]">
      <footer className="w-full flex flex-col justify-between z-99 px-[18px] pt-[56px] pb-[36px] tablet:px-[50px] tablet:pt-[52px] tablet:pb-[24px] max-w-[1140px] mx-auto desktop:px-0  desktop:pt-[42px] desktop:pb-[24px]">
        <div className="flex flex-col tablet:flex-row justify-between gap-y-[22px] pb-[32px] tablet:gap-x-[33px] tablet:pb-[30px] desktop:gap-x-[38px] desktop:pb-[36px]">
          <LogoAndAbout />
          <LinksAndCurrency />
        </div>
        <BottomSection />
      </footer>
    </div>
  );
}
