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

const RenderMobileTable: React.FC<RenderTableProps> = ({
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
          {tableData
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((item, index) => (
              <TableRow
                key={item.id}
                className={index % 2 === 0 ? "bg-[#F7F7F7]" : "bg-white"}
              >
                <TableCell className="text-center flex justify-center items-center text-black font-normal text-xs tablet:text-base">
                  <Image
                    src="/images/home/table/currencies/bitcoin.svg"
                    alt="bitcoin"
                    width={20}
                    height={20}
                    className="tablet:w-[33px] tablet:h-[33px]"
                  />
                  {item.name}
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

export default RenderMobileTable;
