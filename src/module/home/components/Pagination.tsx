import { Button } from "@/components/ui/button";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const buttons = [];

  for (let i = 1; i <= Math.min(3, totalPages); i++) {
    buttons.push(
      <Button
        key={i}
        variant={"outline"}
        size="sm"
        onClick={() => onPageChange(i)}
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
        className="w-[31px] h-[31px] outline-none border-none p-0 rounded-full flex justify-center items-center bg-[#EEF2F5] text-black"
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
        onClick={() => onPageChange(totalPages)}
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

  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      {buttons}
    </div>
  );
};

export default Pagination;
