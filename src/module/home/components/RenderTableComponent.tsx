import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Pagination from "./Pagination";

interface TableData {
  id: number;
  name: string;
  value: number;
  change: number;
  sell: number;
  buy: number;
}
interface RenderTableProps {
  headers: { label: string }[];
  tableData: TableData[];
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const RenderTable: React.FC<RenderTableProps> = ({
  headers,
  tableData,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  return (
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
              <div className="bg-white flex gap-x-2 items-center desktop:p-[24px] desktop:w-[244px] desktop:h-[63px] tablet:w-[130px] tablet:p-[16px] tablet:h-[47px] rounded-lg">
                <Image
                  src="/images/home/table/magnifier/Frame.svg"
                  alt="logo"
                  width={16}
                  height={16}
                  className="w-[16px] h-[16px]"
                />
                <span className="text-[#696464] font">جستجو.......</span>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((item, index) => (
              <TableRow
                key={item.id}
                className={index % 2 === 0 ? "bg-[#F7F7F7]" : ""}
              >
                <TableCell className="text-center flex justify-center items-center">
                  <Image
                    src="/images/home/table/currencies/bitcoin.svg"
                    alt="bitcoin"
                    width={20}
                    height={20}
                    className="tablet:w-[33px] tablet:h-[33px]"
                  />
                  {item.name}
                </TableCell>
                <TableCell className="text-center text-black font-normal tablet:leading-[25px] leading-[21px] tablet:text-base text-sm text-nowrap">
                  ${item.value}
                </TableCell>
                <TableCell
                  className={`text-center font-normal tablet:leading-[25px] leading-[21px] tablet:text-base text-sm text-nowrap ${
                    item.change > 0 ? "text-[#147D03]" : "text-[#EF4040]"
                  }`}
                >
                  {item.change}%
                </TableCell>
                <TableCell className="text-center text-black font-normal tablet:leading-[25px] leading-[21px] tablet:text-base text-sm text-nowrap">
                  {item.buy} تومان
                </TableCell>
                <TableCell className="text-center text-black font-normal tablet:leading-[25px] leading-[21px] tablet:text-base text-sm text-nowrap">
                  {item.sell} تومان
                </TableCell>
                <TableCell className="flex justify-center items-center">
                  <button className="bg-[#1652F0] text-white text-center justify-center rounded-lg font-black flex items-center justify-right tablet:w-[130px] tablet:p-[16px] tablet:h-[47px]">
                    معامله
                  </button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Pagination
        totalItems={tableData.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default RenderTable;
