import Image from "next/image";
import { headerMock } from "@/module/mock/header/header";
import { useMemo } from "react";

// Custom hook for profile data
const useProfileData = () => {
  return useMemo(
    () => ({
      profile: headerMock.profiles[0],
    }),
    []
  );
};

// Atom components
const PhoneIcon: React.FC = () => (
  <Image
    src="/images/header/phone/phone.svg"
    alt="phone"
    className="w-[16px] h-[16px] tablet:w-[20px] tablet:h-[20px]"
    width={20}
    height={20}
  />
);

const ArrowIcon: React.FC = () => (
  <Image
    src="/images/header/arrow/arrow.svg"
    alt="arrow"
    className="w-[8px] h-[4px] object-cover"
    width={8}
    height={4}
  />
);

const ProfileImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <Image
    src={src}
    alt={alt}
    className="w-[30px] h-[30px] tablet:w-[26px] tablet:h-[26px] rounded-full object-cover"
    width={30}
    height={30}
  />
);

// Molecule components
const PhoneNumber: React.FC = () => (
  <div className="hidden tablet:flex flex-row items-center justify-between tablet:gap-x-[4px] desktop:gap-x-[13px]">
    <PhoneIcon />
    <h6 className="text-black font-normal desktop:text-base text-sm">
      021-91008590
    </h6>
  </div>
);

const ProfileInfo: React.FC<{ name: string; imageUrl: string }> = ({
  name,
  imageUrl,
}) => (
  <div className="flex flex-row justify-between items-center tablet:gap-x-[10px] gap-x-[8px]">
    <ProfileImage src={imageUrl} alt={name} />
    <h6 className="text-black font-medium desktop:text-base text-sm">{name}</h6>
    <ArrowIcon />
  </div>
);

// Organism component
const HeaderProfileComponent: React.FC = () => {
  const { profile } = useProfileData();

  return (
    <div className="flex justify-between tablet:gap-x-[16px] desktop:gap-x-[28px]">
      <PhoneNumber />
      <ProfileInfo name={profile.name} imageUrl={profile.imageUrl} />
    </div>
  );
};

export default HeaderProfileComponent;
