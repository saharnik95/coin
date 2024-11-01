interface FirstCurrency {
  id: number;
  name: string;
  imageUrl: string;
  alt: string;
  usd: number;
}
interface SecondCurrency {
  id: number;
  name: string;
  imageUrl: string;
  alt: string;
  usd: number;
}

interface TransactionMock {
  PicUrl: string;
  PicUrl2: string;
  Firstabout: string;
  Secondabout: Second[];
  FirstCurrencies: FirstCurrency[];
  SecondCurrencies: SecondCurrency[];
}
interface Second {
  first: string;
  second: string;
}

export const transactionMock: TransactionMock = {
  PicUrl: "/images/transaction/aboute/coin.png",
  PicUrl2: "/images/transaction/intrest/sammy-line-man-with-money 1.png",

  Firstabout:
    "بیت کوین با نماد اختصاری BTC یک ارز دیجیتال یا شکلی از دارایی دیجیتال است که با ارزش بازار حدود 541 میلیارد دلار، در رتبه 1 بازار قرار داشته و سهم 52.484 درصدی از کل بازار را در اختیار دارد . هر واحد از بیت کوین در این لحظه با قیمت 67977.99 دلار، با احتساب نرخ تتر 64575 تومان معادل 4389678704.25 تومان معامله می شود و حجم مبادلات روزانه آن 20367661885.022 دلار است. قیمت در ۲۴ ساعت اخیر 1.53 تغییر یافته است. بالاترین قیمت بیت کوین در تاریخ 1402 اسفند 24 معادل 73628.4 دلار بوده که همینک -7.67 اختلاف دارد از آن زمان .",

  Secondabout: [
    {
      first:
        "بیت کوین با نماد اختصاری BTC یک ارز دیجیتال یا شکلی از دارایی دیجیتال است که با ارزش بازار حدود 541 میلیارد دلار، در رتبه 1 بازار قرار داشته و سهم 52.484 درصدی از کل بازار را در اختیار دارد . هر واحد از بیت کوین در این لحظه با قیمت 67977.99 دلار، با احتساب نرخ تتر 64575 تومان معادل 4389678704.25 تومان معامله می شود و حجم مبادلات روزانه آن 20367661885.022 دلار است. قیمت در ۲۴ ساعت اخیر 1.53 تغییر یافته است. بالاترین قیمت بیت کوین در تاریخ 1402 اسفند 24 معادل 73628.4 دلار بوده که همینک -7.67 اختلاف دارد از آن زمان .",
      second:
        "بیت کوین با نماد اختصاری BTC یک ارز دیجیتال یا شکلی از دارایی دیجیتال است که با ارزش بازار حدود 541 میلیارد دلار، در رتبه 1 بازار قرار داشته و سهم 52.484 درصدی از کل بازار را در اختیار دارد . هر واحد از بیت کوین در این لحظه با قیمت 67977.99 دلار، با احتساب نرخ تتر 64575 تومان معادل 4389678704.25 تومان معامله می شود و حجم مبادلات روزانه آن 20367661885.022 دلار است. قیمت در ۲۴ ساعت اخیر 1.53 تغییر یافته است. بالاترین قیمت بیت کوین در تاریخ 1402 اسفند 24 معادل 73628.4 دلار بوده که همینک -7.67 اختلاف دارد از آن زمان . ",
    },
  ],

  FirstCurrencies: [
    {
      id: 1,
      name: "تومان ",
      imageUrl: "/images/transaction/form/iran.png",
      alt: "profile1",
      usd: 69000,
    },
    {
      id: 2,
      name: "دلار ",
      imageUrl: "/images/transaction/form/iran.png",
      alt: "profile1",
      usd: 1,
    },
    {
      id: 3,
      name: "لیر ",
      imageUrl: "/images/transaction/form/iran.png",
      alt: "profile1",
      usd: 28,
    },
  ],

  SecondCurrencies: [
    {
      id: 1,
      name: "بیت کوین ",
      imageUrl: "/images/transaction/form/bitcoin.png",
      alt: "profile1",
      usd: 69000,
    },
    {
      id: 2,
      name: "سولانا ",
      imageUrl: "/images/transaction/form/bitcoin.png",
      alt: "profile1",
      usd: 1,
    },
    {
      id: 3,
      name: "اتریوم ",
      imageUrl: "/images/transaction/form/bitcoin.png",
      alt: "profile1",
      usd: 28,
    },
  ],
};
