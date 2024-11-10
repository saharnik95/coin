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
    <div className="desktop:pt-[108px] tablet:pt-[111px] pt-[39px]">
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
      <p className="desktop:pt-[49px] tablet:pt-[36px] pt-[39px] font-normal desktop:text-base desktop:leading-[32px] tablet:text-sm tablet:leading-[28px] leading-[28px] text-xs text-justify">
        {about}
      </p>
      <p className="font-normal desktop:text-base desktop:leading-[32px] tablet:text-sm tablet:leading-[28px] leading-[28px] text-xs text-justify">
        {about}{" "}
      </p>
    </>
  );
}
