import { transactionMock } from "@/module/mock/transaction/transaction";
interface TransactionComponentProps {
  slug: string;
}
interface TransactionSecondDescriptionComponentProps {
  name?: string;
  code?: string;
  change?: number;
  buy?: number;
  sell?: number;
}

const TransactionSecondDescriptionComponent: React.FC<
  TransactionSecondDescriptionComponentProps
> = ({ name, code, change, buy, sell }) => {
  return (
    <div className="tablet:pt-[108px] pt-[40px]">
      <h2
        className="tablet:text-right text-center text-black 
      font-black tablet:text-[30px]  tablet:leading-[50px] leading-[31px] text-xl "
      >
        توضیحات بیشتر درباره {name}
      </h2>
      <p
        className="desktop:pt-[50px] pt-[36px]
      font-normal desktop:text-base desktop:leading-[32px] tablet:text-sm tablet:leading-[28px] leading-[28px] text-xs text-justify"
      >
        {transactionMock.Secondabout[0].first}
      </p>
      <p
        className="
      font-normal desktop:text-base desktop:leading-[32px] tablet:text-sm tablet:leading-[28px] leading-[28px] text-xs text-justify"
      >
        {transactionMock.Secondabout[0].second}
      </p>
    </div>
  );
};

export default TransactionSecondDescriptionComponent;
