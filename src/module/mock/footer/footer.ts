interface Social {
  id: number;
  name: string;
  iconUrl: string;
  url: string;
  alt: string;
}
interface Links {
  id: number;
  name: string;
  alt: string;
}

interface currency {
  id: number;
  name: string;
  alt: string;
}

interface FooterMock {
  about: string;
  socials: Social[];
  logoUrl: string;
  conectedLinks: Links[];
  currencyShare: currency[];
}

export const footerMock: FooterMock = {
  about:
    "راهکارهای پرداخت ری در سال 2009 فعالیت خود را در زمینه سیستم های پرداخت بین المللی با وبسایت wallet.ir آغاز کرد. ری پرداخت با نام تجاری MGY INVESTMENT LTD با شماره ثبت ۷۳۶۵۰۶۳ در کشور انگلستان به ثبت رسید و فعالیت رسمی آغاز نمود.",
  socials: [
    {
      id: 1,
      name: "youtube",
      iconUrl: "/images/footer/socials/youtube.svg",
      url: "https://www.youtube.com/wallet",
      alt: "youtube",
    },
    {
      id: 2,
      name: "linkedin",
      iconUrl: "/images/footer/socials/linkedin.svg",
      url: "https://www.linkedin.com/wallet",
      alt: "linkedin",
    },
    {
      id: 3,
      name: "twitter",
      iconUrl: "/images/footer/socials/twitter.svg",
      url: "https://twitter.com/wallet",
      alt: "twitter",
    },
    {
      id: 4,
      name: "facebook",
      iconUrl: "/images/footer/socials/facebook.svg",
      url: "https://www.facebook.com/wallet",
      alt: "facebook",
    },
    {
      id: 5,
      name: "instagram",
      iconUrl: "/images/footer/socials/instagram.svg",
      url: "https://www.instagram.com/wallet",
      alt: "instagram",
    },
  ],

  logoUrl: "/images/footer/logo/logo.svg",

  conectedLinks: [
    {
      id: 1,
      name: "صفحه اصلی",
      alt: "",
    },
    {
      id: 2,
      name: "سوالات متداول",
      alt: "questions",
    },
    {
      id: 3,
      name: "قیمت رمزارزها",
      alt: "prices",
    },
    {
      id: 4,
      name: "شرایط و قوانین ",
      alt: "rules",
    },
    {
      id: 5,
      name: "مقالات و وبلاگ",
      alt: "articles",
    },

    {
      id: 6,
      name: "فرصت های شغلی ",
      alt: "opurtunities",
    },
    {
      id: 7,
      name: "درباره ما",
      alt: "about",
    },
    {
      id: 8,
      name: " انجمن",
      alt: " forum",
    },
  ],

  currencyShare: [
    {
      id: 1,
      name: " بیت کوین",
      alt: "/BTC",
    },
    {
      id: 2,
      name: " یواس دی کوین ",
      alt: "/USDC",
    },
    {
      id: 3,
      name: "اتریوم ",
      alt: "/ETH",
    },

    {
      id: 4,
      name: "  چین لینک ",
      alt: "/LINK",
    },
    {
      id: 5,
      name: " ریپل",
      alt: "/XRP",
    },
    {
      id: 6,
      name: " دوج کوین",
      alt: "/DOGE",
    },
    {
      id: 7,
      name: " سولانا",
      alt: "/SOL",
    },

    {
      id: 8,
      name: " تتر ",
      alt: "/USDT",
    },
  ],
};
