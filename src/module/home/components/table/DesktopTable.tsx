import React from "react";
import Image from "next/image";
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

interface DesktopTableProps {
  data: TableData[];
  headers: { label: string }[];
  formatNumberWithCommas: (number: number) => string;
  handleTransaction: (item: TableData) => void;
  searchTerm: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function DesktopTable({
  data,
  headers,
  formatNumberWithCommas,
  handleTransaction,
  searchTerm,
  handleChange,
}: DesktopTableProps) {
  return (
    <div className="rounded-lg desktop:mt-[40px] mt-[15px]">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="bg-[#E3E7EC] flex">
            {headers.map((header, index) => (
              <TableHead
                key={index}
                className={`text-black font-normal desktop:text-base desktop:leading-[25px] tablet:text-sm tablet:leading-[22px] flex items-center ${
                  index === 0
                    ? "justify-start desktop:w-[195px] tablet:w-[165px] desktop:pr-[46px] tablet:pr-[28px]"
                    : "flex-grow justify-center pl-4"
                }`}
              >
                {header.label}
              </TableHead>
            ))}
            <TableHead className="flex-grow-0 flex justify-end items-center desktop:pl-5 tablet:pl-[14px] desktop:w-[264px] tablet:w-[144px]">
              <div className="bg-white flex gap-x-2 items-center p-4 w-full desktop:h-[63px] tablet:h-[47px] rounded-lg">
                <Image
                  src="/images/home/table/magnifier/Frame.svg"
                  alt="search"
                  className="w-4 h-4 object-cover"
                  width={16}
                  height={16}
                />
                <input
                  placeholder="جستجو......."
                  className="text-[#696464] font-normal outline-none w-full"
                  value={searchTerm}
                  onChange={handleChange}
                />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={item.id}
              className={`flex ${index % 2 === 0 ? "bg-[#F7F7F7]" : ""}`}
            >
              <TableCell className="flex items-center desktop:w-[195px] tablet:w-[165px] tablet:pr-[11px] desktop:pr-[15px]">
                <div className="flex items-center desktop:gap-[9px] tablet:gap-[6px]">
                  <Image
                    src={item.pic}
                    alt={item.enName}
                    className="tablet:w-[33px] tablet:h-[33px] desktop:w-[37px] desktop:h-[37px]"
                    width={32}
                    height={32}
                  />
                  <div className="flex flex-col desktop:gap-1 tablet:gap-[5px]">
                    <div className="text-black font-medium desktop:leading-[22px] desktop:text-[14px] leading-[18.78px] text-[12px]">
                      {item.name}
                    </div>
                    <div className="text-[#696464] text-xs font-normal desktop:leading-[22px] desktop:text-[14px] leading-[18.78px] text-[12px]">
                      {item.code}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="flex-grow flex justify-center items-center text-black font-normal desktop:leading-[22px] desktop:text-[14px] leading-[18.78px] text-[12px]">
                ${formatNumberWithCommas(item.value)}
              </TableCell>
              <TableCell
                className={`flex-grow flex justify-center items-center font-normal desktop:leading-[22px] desktop:text-[14px] leading-[18.78px] text-[12px] ${
                  item.change > 0 ? "text-[#147D03]" : "text-[#EF4040]"
                }`}
              >
                {item.change}%
              </TableCell>
              <TableCell className="flex-grow flex justify-center items-center text-black font-normal desktop:leading-[22px] desktop:text-[14px] leading-[18.78px] text-[12px]">
                {formatNumberWithCommas(item.sell)} تومان
              </TableCell>
              <TableCell className="flex-grow flex justify-center items-center text-black font-normal desktop:leading-[22px] desktop:text-[14px] leading-[18.78px] text-[12px]">
                {formatNumberWithCommas(item.buy)} تومان
              </TableCell>
              <TableCell className="flex-grow-0 flex justify-end desktop:justify-center items-center desktop:pl-5 tablet:pl-[14px] desktop:w-[264px] tablet:w-[144px]">
                <button
                  onClick={() => handleTransaction(item)}
                  className="bg-[#1652F0] text-white text-center rounded-lg font-bold w-[130px] h-[47px] py-3 px-4"
                >
                  معامله
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
