"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTransactionContext } from "@/context/TransactionContext";
import { DesktopTable } from "./table/DesktopTable";
import { MobileTable } from "./table/MobileTable";
import { Pagination } from "./table/pagination";
import { formatNumberWithCommas } from "./table/formatNumberWithCommas ";

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

  return (
    <div className="w-full">
      <h2 className="text-black font-black desktop:text-[37px] desktop:leading-[63px] tablet:text-[36px] tablet:leading-[50px] leading-[32px] text-xl text-center desktop:mb-[83px] mb-[52px]">
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
              <DesktopTable
                data={allData}
                headers={headers}
                formatNumberWithCommas={formatNumberWithCommas}
                handleTransaction={handleTransaction}
                searchTerm={searchTerm}
                handleChange={handleChange}
              />
              <div className="flex items-center justify-center space-x-2 tablet:pt-[31px] tablet:pb-[9px] desktop:pt-[35px]">
                <Pagination
                  currentPage={currentPage}
                  totalItems={totalItems2}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                />
              </div>
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
                <MobileTable
                  data={allData}
                  formatNumberWithCommas={formatNumberWithCommas}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div
          className="flex items-center justify-center space-x-2 pb-[21px] pt-[12px]"
          dir="ltr"
        >
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems2}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
