"use client";

import * as React from "react";
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
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
}

interface TableInfo {
  name: string;
  data: TableData[];
}

export default function ResponsiveTabbedTablesWithAccordion() {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const itemsPerPage = 9;
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const router = useRouter();
  const [allData, setAllData] = React.useState<TableData[]>([]);
  const [totalItems, setTotalItems] = React.useState<number>(0);
  const [totalItems2, setTotalItems2] = React.useState<number>(0);

  const [activeTab, setActiveTab] = React.useState<string>("دیفای");
  const [Loading, setIsLoading] = React.useState<string | undefined>();

  const handleTransaction = React.useCallback(
    async (item: TableData) => {
      const transactionId = item.code; // Assume this is a string
      const transactionData = {
        name: item.name,
        code: item.code,
        change: item.change,
        buy: item.buy,
        sell: item.sell,
        usd: item.usd,
        value: item.value,
      };

      setIsLoading(transactionId);

      try {
        const response = await fetch("/api/store-transaction", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: transactionId, data: transactionData }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Transaction data stored:", result);

        sessionStorage.setItem(
          `transaction_${transactionId}`,
          JSON.stringify(transactionData)
        );

        router.push(`/transaction/${transactionId}`);
      } catch (error) {
        console.error("Error storing transaction data:", error);
      } finally {
        setIsLoading(undefined);
      }
    },
    [router]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

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
    }));
  }, []);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  function formatNumberWithCommas(number: number) {
    if (isNaN(number)) return number;

    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const renderPaginationButtons = (totalItems: number) => {
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
          className={`w-[31px] h-[31px] outline-none border-none p-0 rounded-full flex justify-center items-center bg-[#EEF2F5] text-black`}
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
          className={`w-[31px] h-[31px] outline-none border-none p-0 rounded-full flex justify-center items-center bg-[#EEF2F5] text-black`}
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
  };

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
        console.log(data.count);
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

  const renderTable = (table: TableInfo) => {
    return (
      <div className="rounded-lg desktop:mt-[40px] mt-[15px]">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#E3E7EC] !important">
              {headers.map((header, index) => (
                <TableHead
                  key={index}
                  className="text-black text-center font-normal desktop:text-base desktop:leading-[25px] leading-[22px]   text-[14px] text-nowrap"
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
                  <input
                    placeholder=" جستجو......."
                    className="text-[#696464] font-normal outline-none w-[60px]"
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
                className={index % 2 === 0 ? "bg-[#F7F7F7]" : ""}
              >
                <TableCell className="text-start flex items-center">
                  <div className="flex  items-center justify-center">
                    <Image
                      src="/images/home/table/currencies/bitcoin.svg"
                      alt={"bitcoin"}
                      className={
                        "tablet:w-[33px] tablet:h-[33px] pl-[6px] desktop:pl-[8px]"
                      }
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-center text-black font-normal desktop:leading-[22px] desktop:text-[14px] leading-[12px]  text-[12px] text-nowrap ">
                      {" "}
                      {item.name}
                    </div>
                    <div className="font-normal text-[#696464] desktop:leading-[22px] desktop:text-[14px] leading-[12px]  text-[12px]">
                      {" "}
                      {item.code}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center text-black font-normal desktop:leading-[22px] desktop:text-[14px] leading-[18px]  text-[12px] text-nowrap ">
                  ${formatNumberWithCommas(item.value)}
                </TableCell>
                <TableCell
                  dir="ltr"
                  className={`text-center font-normal tablet:leading-[22px] desktop:leading-[22px] desktop:text-[14px] leading-[18px]  text-[12px] text-nowrap ${
                    item.change > 0 ? "text-[#147D03]" : "text-[#EF4040]"
                  }`}
                >
                  {item.change}%
                </TableCell>
                <TableCell className="text-center text-black font-normal desktop:leading-[22px] desktop:text-[14px] leading-[18px]  text-[12px] text-nowrap ">
                  {formatNumberWithCommas(item.sell)} تومان
                </TableCell>
                <TableCell className="text-center text-black font-normal desktop:leading-[22px] desktop:text-[14px] leading-[18px]  text-[12px] text-nowrap ">
                  {formatNumberWithCommas(item.buy)} تومان
                </TableCell>
                <TableCell className="flex justify-center items-center">
                  <button
                    onClick={() => handleTransaction(item)}
                    className="bg-[#1652F0] text-white text-center rounded-lg font-black flex items-center justify-center tablet:w-[130px] tablet:p-[16px] tablet:h-[47px]"
                  >
                    معامله
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-center space-x-2 py-4">
          {renderPaginationButtons(totalItems2)}
        </div>
      </div>
    );
  };

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
            {allData.map((item, index) => (
              <React.Fragment key={item.id}>
                <TableRow
                  className={`cursor-pointer ${
                    index % 2 === 0 ? "bg-[#F7F7F7]" : "bg-white"
                  } ${expandedRow === index ? "h-auto" : "h-[48px]"}`}
                  onClick={() => handleRowClick(index)}
                >
                  <TableCell className="text-start items-center text-black font-normal text-xs tablet:text-base">
                    <div className="flex ">
                      <Image
                        src="/images/home/table/currencies/bitcoin.svg"
                        alt="bitcoin"
                        className="tablet:w-[33px] tablet:h-[33px] pl-[6px] desktop:pl-[8px]"
                        width={20}
                        height={20}
                      />
                      <div className="flex flex-col gap-1">
                        <div> {item.name}</div>
                        <div className="font-normal text-[#696464]">
                          {" "}
                          {item.code}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center text-black font-normal text-xs tablet:text-base">
                    ${formatNumberWithCommas(item.value)}
                  </TableCell>
                  <TableCell
                    className={`text-center font-normal text-xs tablet:text-base ${
                      item.change > 0 ? "text-[#147D03]" : "text-[#EF4040]"
                    }`}
                  >
                    {item.change}%
                  </TableCell>
                </TableRow>
                {expandedRow === index && (
                  <TableRow
                    className={`${
                      index % 2 === 0 ? "bg-[#F7F7F7]" : "bg-white"
                    } }`}
                  >
                    <TableCell colSpan={3} className="pt-0">
                      <div className="flex flex-col gap-[10px] ">
                        <div className="grid grid-cols-2 justify-between gap-4 ">
                          <div className="text-start text-black font-normal text-xs tablet:text-base">
                            فروش به والت :{" "}
                          </div>
                          <div className="text-end text-black font-normal text-xs tablet:text-base">
                            {" "}
                            {formatNumberWithCommas(item.buy)} تومان
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-start text-black font-normal text-xs tablet:text-base">
                            {" "}
                            خرید از والت
                          </div>
                          <div className="text-end text-black font-normal text-xs tablet:text-base">
                            {" "}
                            {formatNumberWithCommas(item.sell)} تومان
                          </div>
                        </div>
                        <div className="flex justify-center items-center pt-[24px] pb-[8px]">
                          <Link
                            href={`/transaction/${item.enName}`}
                            className="bg-[#1652F0] text-white text-center rounded-lg font-black flex items-center justify-center w-full p-[16px] h-[47px] "
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
  };

  return (
    <div className="w-full ">
      <h2 className="text-black font-black desktop:text-[40px] desktop:leading-[63px] tablet:text-[36px] tablet:leading-[50px] leading-[32px] text-xl text-center desktop:mb-[83px] tablet:mt-[32px] mb-[32px]">
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
        <div
          className="flex items-center justify-center space-x-2 py-4"
          dir="ltr"
        >
          {renderPaginationButtons(totalItems2)}
        </div>
      </div>
    </div>
  );
}
