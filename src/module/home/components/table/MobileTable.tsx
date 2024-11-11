import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableData {
  id: number;
  name: string;
  value: number;
  change: number;
  sell: number;
  buy: number;
  enName: string;
  code: string;
  usd: number;
  pic: string;
  about: string;
}

interface MobileTableProps {
  data: TableData[];
  formatNumberWithCommas: (number: number) => string;
}

export function MobileTable({
  data,
  formatNumberWithCommas,
}: MobileTableProps) {
  const [expandedRow, setExpandedRow] = React.useState<number | null>(null);

  const handleRowClick = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div className="mt-[12px]">
      <Table className="bg-[#F7F7F7]">
        <TableHeader>
          <TableRow className="bg-[#E3E7EC] h-[64px] rounded-br-[8px]">
            <TableHead className="text-black text-right font-normal text-sm leading-[22px] w-1/3 pr-[30px] rounded-br-[8px]">
              نام رمز ارز
            </TableHead>
            <TableHead className="text-black text-center font-normal text-sm leading-[22px] w-1/3">
              ارزش دلاری
            </TableHead>
            <TableHead className="text-black text-left font-normal text-sm leading-[22px] w-1/3 pl-[26px] rounded-bl-[8px]">
              تغییر روزانه
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <React.Fragment key={item.id}>
              <TableRow
                className={`cursor-pointer ${
                  index % 2 === 0 ? "bg-[#F7F7F7]" : "bg-white"
                } ${expandedRow === index ? "h-auto" : "h-[48px]"}`}
                onClick={() => handleRowClick(index)}
              >
                <TableCell className="text-start items-center text-black font-normal text-xs tablet:text-base pr-[12px] w-1/3">
                  <div className="flex gap-[6px]">
                    <Image
                      src={item.pic}
                      alt={item.enName}
                      className="w-[33px] h-[33px] object-cover"
                      width={33}
                      height={33}
                    />
                    <div className="flex flex-col gap-1">
                      <div className="font-medium text-xs leading-[18.78px] text-black">
                        {item.name}
                      </div>
                      <div className="font-normal text-xs leading-[18.78px] text-[#696464]">
                        {item.code}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center px-0 text-black font-normal text-xs leading-[18px] w-1/3">
                  ${formatNumberWithCommas(item.value)}
                </TableCell>
                <TableCell
                  className={`text-left font-normal text-xs tablet:text-base pl-[14px] leading-[18px] pr-0 w-1/3 ${
                    item.change > 0 ? "text-[#147D03]" : "text-[#EF4040]"
                  }`}
                >
                  <h4 dir="ltr"> {item.change}%</h4>
                </TableCell>
              </TableRow>

              {expandedRow === index && (
                <TableRow
                  className={index % 2 === 0 ? "bg-[#F7F7F7]" : "bg-white"}
                >
                  <TableCell colSpan={3} className="pt-0 px-[14px]">
                    <div className="flex flex-col gap-[11px]">
                      <div className="grid grid-cols-2 justify-between gap-4">
                        <div className="text-start text-black font-normal text-xs leading-[18.78px]">
                          فروش به والت :
                        </div>
                        <div className="text-end text-black font-normal text-xs leading-[18.78px]">
                          {formatNumberWithCommas(item.buy)} تومان
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-start text-black font-normal text-xs leading-[18.78px]">
                          خرید از والت
                        </div>
                        <div className="text-end text-black font-normal text-xs leading-[18.78px]">
                          {formatNumberWithCommas(item.sell)} تومان
                        </div>
                      </div>
                      <div className="flex justify-center items-center pt-[15px] pb-[9px]">
                        <Link
                          href={`/transaction/${item.enName}`}
                          className="bg-[#1652F0] text-white text-center rounded-lg font-black leading-[18.78px] flex items-center justify-center w-full p-[16px] h-[47px]"
                        >
                          معامله
                        </Link>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
