"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import DescriptionComponent from "./components/DescriptionComponent";
import ResponsiveTabbedTablesWithAccordion from "./components/TableComponent";
import { TransactionProvider } from "@/context/TransactionContext";

const HomeComponent: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <div className="flex flex-col justify-between items-center bg-white desktop:gap-y-[163px] tablet:gap-y-[90px] gap-y-[70px]  max-w-[1140px] mx-auto desktop:px-0  desktop:py-[96px] tablet:px-[50px] tablet:pt-[61px] tablet:pb-[66px] px-[20px] pt-[50px] pb-[55px] ">
      <div className="w-full">
        <QueryClientProvider client={queryClient}>
          <TransactionProvider>
            <ResponsiveTabbedTablesWithAccordion />
          </TransactionProvider>
        </QueryClientProvider>
      </div>
      <div className="">
        {" "}
        <DescriptionComponent />
      </div>
    </div>
  );
};

export default HomeComponent;
