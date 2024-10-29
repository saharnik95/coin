"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";

interface TableData {
  id: number;
  name: string;
  value: number;
  change: number;
  sell: number;
  buy: number;
}

interface TableInfo {
  name: string;
  data: TableData[];
}

export default function ResponsiveTabbedTablesWithAccordion() {
  const headers = [
    { label: "نام رمز ارز" },
    { label: "ارزش دلاری" },
    { label: "تغییر روزانه" },
    { label: "خرید از والت" },
    { label: "فروش به والت" },
  ];

  const [tables, setTables] = React.useState<TableInfo[]>(() => [
    { name: "دیفای", data: [] },
    { name: "حریم خصوصی", data: [] },
    { name: "متاورس", data: [] },
    { name: "قابل استخراج", data: [] },
    { name: "میم کوین", data: [] },
    { name: "استیبل کوین", data: [] },
    { name: "توکن", data: [] },
    { name: "iCO", data: [] },
  ]);

  const generateTableData = (items: any[]): TableData[] => {
    return items.map((item, index) => ({
      id: item.id,
      name: item.fa_name || `Item ${index + 1}`,
      value: item.irt_price || 0,
      change: item.daily_change_percent || 0,
      sell: item.sell_irt_price || 0,
      buy: item.buy_irt_price || 0,
    }));
  };

  {
    /*Fetch Data*/
  }
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://b.wallet.ir/coinlist/list");
        const data = await response.json();

        if (data.items && Array.isArray(data.items)) {
          const updatedTables = tables.map((table) => ({
            ...table,
            data: generateTableData(data.items),
          }));
          setTables(updatedTables);
        } else {
          console.error("Expected result.items to be an array:", data.items);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  {
    /*pagination*/
  }

  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const itemsPerPage = 9;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const renderPaginationButtons = (totalItems: number) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const buttons: JSX.Element[] = [];

    for (let i = 1; i <= Math.min(3, totalPages); i++) {
      buttons.push(
        <Button
          key={i}
          variant={"outline"}
          size="sm"
          onClick={() => handlePageChange(i)}
          lang="fa"
          className={`w-[31px] h-[31px] outline-none border-none p-0 rounded-full flex justify-center items-center ${
            currentPage === i
              ? "bg-[#1652F0] text-white"
              : "bg-[#EEF2F5] text-black"
          }`}
        >
          {i}
        </Button>
      );
    }

    if (totalPages > 4) {
      buttons.push(
        <Button
          key="ellipsis"
          variant="outline"
          size="sm"
          disabled
          className={`w-[31px] h-[31px] outline-none border-none p-0 rounded-full flex justify-center items-center bg-[#EEF2F5] text-black`}
        >
          ...
        </Button>
      );
    }

    if (totalPages > 3) {
      buttons.push(
        <Button
          key={totalPages}
          variant={currentPage === totalPages ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(totalPages)}
          className={`w-[31px] h-[31px] outline-none border-none p-0 rounded-full flex justify-center items-center ${
            currentPage === totalPages
              ? "bg-[#1652F0] text-white"
              : "bg-[#EEF2F5] text-black"
          }`}
        >
          {totalPages}
        </Button>
      );
    }

    return buttons;
  };

  {
    /*Render Table*/
  }
  const renderTable = (table: TableInfo) => (
    <div className="rounded-lg desktop:mt-[40px] mt-[15px]">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#E3E7EC] !important">
            {headers.map((header, index) => (
              <TableHead
                key={index}
                className="text-black text-center font-normal desktop:text-xl desktop:leading-[31px] tablet:leading-[25px] leading-[21px] tablet:text-base text-sm text-nowrap"
              >
                {header.label}
              </TableHead>
            ))}

            <TableHead className="flex justify-center items-center">
              <div className="bg-white flex gap-x-2 items-center  desktop:p-[24px] desktop:w-[244px] desktop:h-[63px] tablet:w-[130px] tablet:p-[16px] tablet:h-[47px] rounded-lg">
                <Image
                  src="/images/home/table/magnifier/Frame.svg"
                  alt={"logo"}
                  className={" w-[16px] h-[16px]  "}
                  width={16}
                  height={16}
                />
                <span className="text-[#696464] font"> جستجو.......</span>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.data
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((item, index) => (
              <TableRow
                key={item.id}
                className={index % 2 === 0 ? "bg-[#F7F7F7]" : ""}
              >
                <TableCell className="text-center flex justify-center items-center">
                  <Image
                    src="/images/home/table/currencies/bitcoin.svg"
                    alt={"bitcoin"}
                    className={
                      "tablet:w-[33px] tablet:h-[33px] pl-[6px] desktop:pl-[8px]"
                    }
                    width={20}
                    height={20}
                  />
                  {item.name}
                </TableCell>
                <TableCell className="text-center text-black font-normal tablet:leading-[25px] leading-[21px] tablet:text-base text-sm text-nowrap ">
                  ${item.value}
                </TableCell>
                <TableCell
                  className={`text-center font-normal tablet:leading-[25px] leading-[21px] tablet:text-base text-sm text-nowrap ${
                    item.change > 0 ? "text-[#147D03]" : "text-[#EF4040]"
                  }`}
                >
                  {item.change}%
                </TableCell>
                <TableCell className="text-center text-black font-normal tablet:leading-[25px] leading-[21px] tablet:text-base text-sm text-nowrap ">
                  {item.buy} تومان
                </TableCell>
                <TableCell className="text-center text-black font-normal tablet:leading-[25px] leading-[21px] tablet:text-base text-sm text-nowrap ">
                  {item.sell} تومان
                </TableCell>
                <TableCell className="flex justify-center items-center">
                  <Link
                    href={`/transaction/${"bitcoin"}`}
                    className="bg-[#1652F0] text-white text-center rounded-lg font-black flex items-center justify-center tablet:w-[130px] tablet:p-[16px] tablet:h-[47px]"
                  >
                    معامله
                  </Link>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-center space-x-2 py-4">
        {renderPaginationButtons(table.data.length)}
      </div>
    </div>
  );

  {
    /*Render Table*/
  }

  const renderMobileTable = (table: TableInfo) => {
    const [expandedRow, setExpandedRow] = React.useState<number | null>(null);

    const handleRowClick = (index: number) => {
      setExpandedRow(expandedRow === index ? null : index);
    };

    return (
      <div className="rounded-lg desktop:mt-[40px] mt-[15px]">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#E3E7EC] !important">
              <TableHead className="text-black text-center font-normal text-sm tablet:text-base">
                نام
              </TableHead>
              <TableHead className="text-black text-center font-normal text-sm tablet:text-base">
                ارزش
              </TableHead>
              <TableHead className="text-black text-center font-normal text-sm tablet:text-base">
                تغییر
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.data
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((item, index) => (
                <TableRow
                  key={item.id}
                  className={`cursor-pointer ${
                    index % 2 === 0 ? "bg-[#F7F7F7]" : "bg-white"
                  } ${expandedRow === index ? "h-[223px]  " : "h-[48px]"}`}
                  onClick={() => handleRowClick(index)}
                >
                  <TableCell className="text-center items-center text-black font-normal text-xs tablet:text-base">
                    <div className="flex items-center justify-center ">
                      <Image
                        src="/images/home/table/currencies/bitcoin.svg"
                        alt="bitcoin"
                        className="tablet:w-[33px] tablet:h-[33px] pl-[6px] desktop:pl-[8px]"
                        width={20}
                        height={20}
                      />
                      {item.name}
                    </div>
                    {expandedRow === index && <div>فروش به والت </div>}{" "}
                    {expandedRow === index && <div> خرید از والت </div>}{" "}
                    {expandedRow === index && (
                      <div className="">
                        <Link
                          href={`/transaction/${encodeURIComponent(item.name)}`}
                          className="bg-[#1652F0] text-white text-center rounded-lg font-black flex items-center justify-center tablet:w-[130px] tablet:p-[16px] tablet:h-[47px]"
                        >
                          معامله
                        </Link>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-center text-black font-normal text-xs tablet:text-base">
                    ${item.value}
                  </TableCell>
                  <TableCell
                    className={`text-center font-normal text-xs tablet:text-base ${
                      item.change > 0 ? "text-[#147D03]" : "text-[#EF4040]"
                    }`}
                  >
                    {item.change}%
                    {expandedRow === index && <div>{item.buy} </div>}{" "}
                    {expandedRow === index && <div>{item.sell} </div>}{" "}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <div className="w-full ">
      <h2 className="text-black font-black desktop:text-[40px] desktop:leading-[63px] tablet:text-[36px] tablet:leading-[50px] leading-[32px] text-xl text-center desktop:mb-[83px] tablet:mt-[32px] mb-[32px]">
        لیست قیمت لحظه‌ای ارزهای دیجیتال‌
      </h2>
      {/* Desktop view */}
      <div className="hidden tablet:block">
        <Tabs
          defaultValue={tables[0].name}
          onValueChange={() => setCurrentPage(1)}
        >
          <TabsList className="grid w-full  grid-cols-8">
            {tables.map((table) => (
              <TabsTrigger key={table.name} value={table.name}>
                {table.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {tables.map((table) => (
            <TabsContent key={table.name} value={table.name}>
              {renderTable(table)}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Mobile view */}
      <div className="tablet:hidden ">
        <Accordion type="single" collapsible className="rounded-lg ">
          {tables.map((table) => (
            <AccordionItem
              className="rounded-lg"
              key={table.name}
              value={table.name}
            >
              <AccordionTrigger className="border-none text-center rounded-lg font-black data-[state=open]:bg-[#1652F0] data-[state=open]:text-white">
                {table.name}
              </AccordionTrigger>
              <AccordionContent className="rounded-lg ">
                {renderMobileTable(table)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="flex items-center justify-center space-x-2 py-4">
          {renderPaginationButtons(10)}
        </div>
      </div>
    </div>
  );
}
