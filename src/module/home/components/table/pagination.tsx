import React from "react";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
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

  const renderButton = (pageNumber: number, label?: string) => (
    <button
      key={label ? `ellipsis-${pageNumber}` : pageNumber}
      onClick={() => onPageChange(pageNumber)}
      className={`w-[31px] h-[31px] outline-none border-none p-0 rounded-full flex justify-center items-center ${
        currentPage === pageNumber
          ? "bg-[#1652F0] text-white"
          : "bg-[#EEF2F5] text-black"
      }`}
      disabled={label === "..."}
    >
      {label || pageNumber}
    </button>
  );

  return (
    <div className="flex items-center justify-center space-x-2">
      {renderButton(1)}
      {startPage > 2 && renderButton(-1, "...")}
      {Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      ).map((pageNumber) => renderButton(pageNumber))}
      {endPage < totalPages - 1 && renderButton(-2, "...")}
      {totalPages > 1 && renderButton(totalPages)}
    </div>
  );
}
