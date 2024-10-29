interface Profile {
  id: number;
  name: string;
  imageUrl: string;
  alt: string;
}

interface HeaderMock {
  logoUrl: string;
  profiles: Profile[];
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
};
