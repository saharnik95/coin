"use client";

import React from "react";
import Image from "next/image";
import { transactionMock } from "@/module/mock/transaction/transaction";

// Types
interface TransactionDescriptionProps {
  name?: string;
  about?: string;
}

// Custom Hook
const useTransactionImage = () => {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  React.useEffect(() => {
    const img = document.createElement("img");
    img.src = transactionMock.PicUrl;
    img.onload = () => setImageLoaded(true);
  }, []);

  return { imageLoaded, imageUrl: transactionMock.PicUrl };
};

// Atomic Components
const Title = ({ name }: { name: string }) => (
  <h2 className="tablet:text-right text-center text-black font-black tablet:text-[30px] tablet:leading-[50px] leading-[31px] text-xl">
    درباره <span className="text-[#0D1A8E]">{name}</span>
  </h2>
);

const ImageSection = () => {
  const { imageLoaded, imageUrl } = useTransactionImage();

  return (
    <div className="w-[337px] h-[195px] tablet:h-[321px] tablet:w-[555px] tablet:mt-[47px] mt-[35px] desktop:mt-0">
      {imageLoaded && (
        <Image
          src={imageUrl}
          alt="Transaction illustration"
          className="object-cover w-full h-full"
          width={555}
          height={321}
        />
      )}
    </div>
  );
};

const DescriptionSection = ({
  about,
  name,
}: {
  about: string;
  name: string;
}) => (
  <div className="flex flex-col gap-y-[29px]">
    <div className="desktop:justify-start justify-center items-center desktop:flex hidden">
      <Title name={name} />
    </div>
    <p className="desktop:pt-[0px] tablet:pt-[47px] pt-[35px] desktop:max-w-[555px] font-normal desktop:text-base desktop:leading-[32px] tablet:text-sm tablet:leading-[28px] leading-[28px] text-xs text-justify">
      {about}
    </p>
  </div>
);

// Main Component
export default function TransactionFirstDescriptionComponent({
  name = "",
  about = "",
}: TransactionDescriptionProps) {
  return (
    <div className="w-full desktop:pt-[161px] tablet:pt-[59px] pt-[53px]">
      <div className="flex desktop:justify-start justify-center items-center desktop:hidden">
        <Title name={name} />
      </div>

      <div className="flex flex-col desktop:flex-row-reverse desktop:gap-x-[30px] justify-between items-center">
        <ImageSection />
        <DescriptionSection about={about} name={name} />
      </div>
    </div>
  );
}
