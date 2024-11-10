"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTransactionContext } from "@/context/TransactionContext";

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

interface TableInfo {
  name: string;
  data: TableData[];
}

export default function ResponsiveTabbedTablesWithAccordion() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [allData, setAllData] = React.useState<TableData[]>([]);
  const [totalItems, setTotalItems] = React.useState(0);
  const [totalItems2, setTotalItems2] = React.useState(0);
  const [activeTab, setActiveTab] = React.useState("دیفای");
  const [tables, setTables] = React.useState<TableInfo[]>([
    { name: "دیفای", data: [] },
    { name: "حریم خصوصی", data: [] },
    { name: "متاورس", data: [] },
    { name: "قابل استخراج", data: [] },
    { name: "میم کوین", data: [] },
    { name: "استیبل کوین", data: [] },
    { name: "توکن", data: [] },
    { name: "iCO", data: [] },
  ]);

  const router = useRouter();
  const { setTransactionData } = useTransactionContext();
  const itemsPerPage = 9;

  const headers = [
    { label: "نام رمز ارز" },
    { label: "ارزش دلاری" },
    { label: "تغییر روزانه" },
    { label: "خرید از والت" },
    { label: "فروش به والت" },
  ];

  const handleTransaction = React.useCallback(
    (item: TableData) => {
      const encodedCode = encodeURIComponent(item.code);
      router.push(`/transaction/${encodedCode}`);
    },
    [router]
  );

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1);
    },
    []
  );

  const handlePageChange = React.useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  const formatNumberWithCommas = React.useCallback((number: number) => {
    return isNaN(number)
      ? number
      : number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }, []);

  const generateTableData = React.useCallback((items: any[]): TableData[] => {
    return items.map((item, index) => ({
      id: item.id,
      name: item.fa_name || `Item ${index + 1}`,
      value: item.irt_price || 0,
      change: item.daily_change_percent || 0,
      sell: item.sell_irt_price || 0,
      buy: item.buy_irt_price || 0,
      enName: item.en_name,
      code: item.currency_code,
      usd: item.price,
      pic: item.icon,
      about: item.about,
    }));
  }, []);

  const renderPaginationButtons = React.useCallback(
    (totalItems: number) => {
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      const buttons: JSX.Element[] = [];
      const maxButtonsToShow = 4;
      const halfButtons = Math.floor((maxButtonsToShow - 2) / 2);

      const startPage = Math.max(2, currentPage - halfButtons);
      let endPage = Math.min(totalPages - 1, currentPage + halfButtons);

      if (currentPage + halfButtons >= totalPages - 1) {
        endPage = Math.min(totalPages - 1, currentPage + 2);
      }

      if (currentPage <= halfButtons + 1) {
        endPage = Math.min(maxButtonsToShow - 1, totalPages - 1);
      }

      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`w-[31px] h-[31px] outline-none border-none p-0 rounded-full flex justify-center items-center ${
            currentPage === 1
              ? "bg-[#1652F0] text-white"
              : "bg-[#EEF2F5] text-black"
          }`}
        >
          1
        </button>
      );

      if (startPage > 2) {
        buttons.push(
          <button
            key="ellipsis-start"
            disabled
            className="w-[31px] h-[31px] outline-none border-none p-0 rounded-full flex justify-center items-center bg-[#EEF2F5] text-black"
          >
            ...
          </button>
        );
      }

      for (let i = startPage; i <= endPage; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            lang="fa"
            className={`w-[31px] h-[31px] outline-none border-none p-0 rounded-full flex justify-center items-center ${
              currentPage === i
                ? "bg-[#1652F0] text-white"
                : "bg-[#EEF2F5] text-black"
            }`}
          >
            {i}
          </button>
        );
      }

      if (endPage < totalPages - 1) {
        buttons.push(
          <button
            key="ellipsis-end"
            disabled
            className="w-[31px] h-[31px] outline-none border-none p-0 rounded-full flex justify-center items-center bg-[#EEF2F5] text-black"
          >
            ...
          </button>
        );
      }

      if (totalPages > 1) {
        buttons.push(
          <button
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
            className={`w-[31px] h-[31px] outline-none border-none p-0 rounded-full flex justify-center items-center ${
              currentPage === totalPages
                ? "bg-[#1652F0] text-white"
                : "bg-[#EEF2F5] text-black"
            }`}
          >
            {totalPages}
          </button>
        );
      }

      return buttons;
    },
    [currentPage, handlePageChange]
  );

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://b.wallet.ir/coinlist/list", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            page: currentPage,
            limit: itemsPerPage,
            search: searchTerm,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setTotalItems2(data.count);
        if (data.items && Array.isArray(data.items)) {
          const newTableData = generateTableData(data.items);
          setAllData(newTableData);
          setTotalItems(data.total || newTableData.length);

          setTables((prevTables) =>
            prevTables.map((table) => ({
              ...table,
              data: table.name === activeTab ? newTableData : table.data,
            }))
          );
        } else {
          console.error("Expected data.items to be an array:", data.items);
        }
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };

    fetchData();
  }, [currentPage, searchTerm, generateTableData, activeTab]);

  const renderTable = React.useCallback(
    (table: TableInfo) => {
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
                  <div className="bg-white flex  gap-x-2 items-center p-4 w-full desktop:h-[63px] tablet:h-[47px] rounded-lg">
                    <Image
                      src="/images/home/table/magnifier/Frame.svg"
                      alt="search"
                      className="w-4 h-4 object-cover "
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
              {allData.map((item, index) => (
                <TableRow
                  key={item.id}
                  className={`flex ${index % 2 === 0 ? "bg-[#F7F7F7]" : ""}`}
                >
                  <TableCell className="flex items-center desktop:w-[195px] tablet:w-[165px] tablet:pr-[11px] desktop:pr-[15px]">
                    {" "}
                    {/* Adjust width for alignment */}
                    <div className="flex items-center desktop:gap-[9px] tablet:gap-[6px]">
                      <Image
                        src={item.pic}
                        alt={item.enName}
                        className="tablet:w-[33px] tablet:h-[33px] desktop:w-[37px] desktop:h-[37px]  "
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
          <div className="flex items-center justify-center space-x-2 tablet:pt-[31px] tablet:pb-[9px] desktop:pt-[35px] ">
            {renderPaginationButtons(totalItems2)}
          </div>
        </div>
      );
    },
    [
      allData,
      formatNumberWithCommas,
      handleChange,
      handleTransaction,
      headers,
      renderPaginationButtons,
      searchTerm,
      totalItems2,
    ]
  );

  const renderMobileTable = React.useCallback(
    (table: TableInfo) => {
      const [expandedRow, setExpandedRow] = React.useState<number | null>(null);

      const handleRowClick = (index: number) => {
        setExpandedRow(expandedRow === index ? null : index);
      };

      return (
        <div className=" mt-[12px]">
          <Table className="bg-[#F7F7F7] ">
            <TableHeader className="">
              <TableRow className="bg-[#E3E7EC] h-[64px] rounded-br-[8px] ">
                <TableHead className="text-black  text-right font-normal text-sm leading-[22px] w-1/3 pr-[30px] rounded-br-[8px]">
                  نام رمز ارز
                </TableHead>
                <TableHead className="text-black text-center font-normal text-sm leading-[22px] w-1/3">
                  ارزش دلاری
                </TableHead>
                <TableHead className="text-black text-left font-normal text-sm leading-[22px] w-1/3 pl-[26px]  rounded-bl-[8px]">
                  تغییر روزانه
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allData.map((item, index) => (
                <React.Fragment key={item.id}>
                  <TableRow
                    className={`cursor-pointer ${
                      index % 2 === 0 ? "bg-[#F7F7F7]" : "bg-white"
                    } ${expandedRow === index ? "h-auto" : "h-[48px]"}`}
                    onClick={() => handleRowClick(index)}
                  >
                    <TableCell className="text-start items-center text-black font-normal text-xs tablet:text-base pr-[12px] w-1/3">
                      <div className="flex gap-[6px] ">
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
    },
    [allData, formatNumberWithCommas]
  );

  return (
    <div className="w-full">
      <h2 className="text-black font-black desktop:text-[37px] desktop:leading-[63px] tablet:text-[36px] tablet:leading-[50px] leading-[32px] text-xl text-center desktop:mb-[83px]  mb-[52px]">
        لیست قیمت لحظه‌ای ارزهای دیجیتال‌
      </h2>
      <div className="hidden tablet:block">
        <Tabs
          defaultValue={tables[0].name}
          onValueChange={(value) => {
            setActiveTab(value);
            setCurrentPage(1);
          }}
        >
          <TabsList className="grid w-full grid-cols-8">
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
      <div className="tablet:hidden">
        <Accordion type="single" collapsible className="rounded-lg">
          {tables.map((table) => (
            <AccordionItem
              className="rounded-lg"
              key={table.name}
              value={table.name}
            >
              <AccordionTrigger
                className="border-none text-center rounded-lg font-black data-[state=open]:bg-[#1652F0] data-[state=open]:text-white
              text-[12px] leading-[18.78px]"
              >
                {table.name}
              </AccordionTrigger>
              <AccordionContent className="rounded-lg">
                {renderMobileTable(table)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div
          className="flex items-center justify-center space-x-2 pb-[21px] pt-[12px]"
          dir="ltr"
        >
          {renderPaginationButtons(totalItems2)}
        </div>
      </div>
    </div>
  );
}
