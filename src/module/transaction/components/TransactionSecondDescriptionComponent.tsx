import { transactionMock } from "@/module/mock/transaction/transaction";

interface TransactionSecondDescriptionComponentProps {
  name?: string;
  about?: string;
}

export default function TransactionSecondDescriptionComponent({
  name = "",
  about = "",
}: TransactionSecondDescriptionComponentProps) {
  return (
    <div className="tablet:pt-[108px] pt-[40px]">
      <h2 className="tablet:text-right text-center text-black font-black tablet:text-[30px] tablet:leading-[50px] leading-[31px] text-xl">
        توضیحات بیشتر درباره {name}
      </h2>
      <DescriptionParagraphs about={about} />
    </div>
  );
}

function DescriptionParagraphs({ about }: { about: string }) {
  return (
    <>
      <p className="desktop:pt-[50px] pt-[36px] font-normal desktop:text-base desktop:leading-[32px] tablet:text-sm tablet:leading-[28px] leading-[28px] text-xs text-justify">
        {about}
      </p>
      <p className="font-normal desktop:text-base desktop:leading-[32px] tablet:text-sm tablet:leading-[28px] leading-[28px] text-xs text-justify">
        {about}{" "}
      </p>
    </>
  );
}
