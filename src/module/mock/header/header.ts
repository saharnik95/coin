interface Profile {
  id: number;
  name: string;
  imageUrl: string;
  alt: string;
}
interface MenuItem {
  id: number;
  name: string;
  alt: string;
}

interface HeaderMock {
  logoUrl: string;
  profiles: Profile[];
  menuItems: MenuItem[];
}

export const headerMock: HeaderMock = {
  logoUrl: "/images/header/logo/logo.svg",

  profiles: [
    {
      id: 1,
      name: "علی اسماعیلی",
      imageUrl: "/images/header/profile/profile1.png",
      alt: "profile1",
    },
  ],

  menuItems: [
    {
      id: 1,
      name: "صفحه اصلی",
      alt: "",
    },

    {
      id: 2,
      name: "قیمت رمزارزها",
      alt: "prices",
    },

    {
      id: 3,
      name: " مقالات ",
      alt: "articles",
    },

    {
      id: 4,
      name: "تماس با ما",
      alt: "about",
    },
  ],
};
