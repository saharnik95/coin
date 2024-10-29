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
}

interface currency {
  id: number;
  name: string;
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
    },
    {
      id: 2,
      name: "سوالات متداول",
    },
    {
      id: 3,
      name: "قیمت رمزارزها",
    },
    {
      id: 4,
      name: "شرایط و قوانین ",
    },
    {
      id: 5,
      name: "مقالات و وبلاگ",
    },

    {
      id: 6,
      name: "فرصت های شغلی ",
    },
    {
      id: 7,
      name: "درباره ما",
    },
    {
      id: 8,
      name: " انجمن",
    },
  ],

  currencyShare: [
    {
      id: 1,
      name: " بیت کوین",
    },
    {
      id: 2,
      name: " یواس دی کوین ",
    },
    {
      id: 3,
      name: "اتریوم ",
    },

    {
      id: 4,
      name: "  چین لینک ",
    },
    {
      id: 5,
      name: " ریپل",
    },
    {
      id: 6,
      name: " دوج کوین",
    },
    {
      id: 7,
      name: " سولانا",
    },

    {
      id: 8,
      name: " تتر ",
    },
  ],
};
