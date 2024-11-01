import { transactionMock } from "@/module/mock/transaction/transaction";
import Image from "next/image";

interface TransactionFirstDescriptionComponentProps {
  name?: string; // Optional to handle undefined values
  code?: string;
  change?: number;
  buy?: number;
  sell?: number;
}
const TransactionFirstDescriptionComponent: React.FC<
  TransactionFirstDescriptionComponentProps
> = ({ name, code, change, buy, sell }) => {
  return (
    <div className="tablet:pt-[161px] pt-[50px] w-full ">
      <div className="flex desktop:justify-start justify-center items-center">
        <h2
          className="tablet:text-right text-center text-black 
  font-black tablet:text-[30px]  tablet:leading-[50px] leading-[31px] text-xl "
        >
          درباره <span className="text-[#0D1A8E]"> {name}</span>
        </h2>
      </div>

      <div className="flex flex-col desktop:flex-row-reverse desktop:gap-x-[30px] justify-between items-center">
        <Image
          src={transactionMock.PicUrl}
          alt={"pic"}
          className={
            " w-[337px] h-[195px]   tablet:h-[321px] tablet:w-[555px] tablet:mt-[47px] mt-[35px] desktop:mt-0 "
          }
          width={321}
          height={555}
        />
        <p
          className="desktop:pt-[29px] tablet:pt-[47px] pt-[35px] desktop:max-w-[555px] 
  font-normal desktop:text-base desktop:leading-[32px] tablet:text-sm tablet:leading-[28px] leading-[28px] text-xs text-justify"
        >
          {transactionMock.Firstabout}
        </p>
      </div>
    </div>
  );
};

export default TransactionFirstDescriptionComponent;
