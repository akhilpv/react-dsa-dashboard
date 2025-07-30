import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const prevPage = () => {
    if (currentPage > 0) onPageChange(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button
        onClick={prevPage}
        disabled={currentPage === 0}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        <ChevronLeft size={18} />
      </button>
      <span className="text-sm font-medium">
        Page {currentPage + 1} of {totalPages}
      </span>
      <button
        onClick={nextPage}
        disabled={currentPage >= totalPages - 1}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};