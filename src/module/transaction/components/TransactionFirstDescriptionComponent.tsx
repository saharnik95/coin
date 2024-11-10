import Image from "next/image";
import { transactionMock } from "@/module/mock/transaction/transaction";

interface TransactionFirstDescriptionComponentProps {
  name?: string;
  about?: string;
}

export default function TransactionFirstDescriptionComponent({
  name = "",
  about = "",
}: TransactionFirstDescriptionComponentProps) {
  return (
    <div className="w-full desktop:pt-[161px] tablet:pt-[59px] pt-[53px]">
      <div className="flex desktop:justify-start justify-center items-center desktop:hidden">
        <h2 className="tablet:text-right text-center text-black font-black tablet:text-[30px] tablet:leading-[50px] leading-[31px] text-xl">
          درباره <span className="text-[#0D1A8E]">{name}</span>
        </h2>
      </div>

      <div className="flex flex-col desktop:flex-row-reverse desktop:gap-x-[30px] justify-between items-center">
        <ImageSection />
        <DescriptionSection about={about} name={name} />
      </div>
    </div>
  );
}

function ImageSection() {
  return (
    <Image
      src={transactionMock.PicUrl}
      alt="Transaction illustration"
      className="w-[337px] h-[195px] tablet:h-[321px] tablet:w-[555px] tablet:mt-[47px] mt-[35px] desktop:mt-0 object-cover"
      width={555}
      height={321}
    />
  );
}

function DescriptionSection({ about, name }: { about: string; name: string }) {
  return (
    <div className="flex flex-col gap-y-[29px]">
      <div className=" desktop:justify-start justify-center items-center desktop:flex hidden">
        <h2 className="tablet:text-right text-center text-black font-black tablet:text-[30px] tablet:leading-[50px] leading-[31px] text-xl">
          درباره <span className="text-[#0D1A8E]">{name}</span>
        </h2>
      </div>
      <p className="desktop:pt-[0px] tablet:pt-[47px] pt-[35px] desktop:max-w-[555px] font-normal desktop:text-base desktop:leading-[32px] tablet:text-sm tablet:leading-[28px] leading-[28px] text-xs text-justify">
        {about}
      </p>
    </div>
  );
}
