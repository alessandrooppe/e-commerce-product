import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`px-3 py-1 mx-1  mb-2 rounded ${currentPage === i ? 'bg-blue-600 text-white' : 'bg-gray-300 hover:bg-blue-500 text-black'}`}
          >
            {i}
          </button>
        );
      }
    } else {
      if (currentPage > 3) {
        pageNumbers.push(<span key="dots-prev" className="px-3 py-1 mx-1">...</span>);
      }
      for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`px-3 py-1 mx-1 mb-2 rounded ${currentPage === i ? 'bg-blue-600 text-white mb-2' : 'bg-gray-300 hover:bg-blue-500 text-black'}`}
          >
            {i}
          </button>
        );
      }
      if (currentPage < totalPages - 2) {
        pageNumbers.push(<span key="dots-next" className="px-3 py-1 mx-1">...</span>);
      }
      if (currentPage < totalPages) {
        pageNumbers.push(
          <button
            key={totalPages}
            onClick={() => onPageChange(totalPages)}
            className={`px-3 py-1 mx-1 rounded mb-2 ${currentPage === totalPages ? 'bg-blue-600 text-white' : 'bg-gray-300 hover:bg-blue-500 text-black'}`}
          >
            {totalPages}
          </button>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center mt-8 flex-wrap">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 mx-1 mb-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-500'}`}
      >
        Previous
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 mx-1 mb-2 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-500'}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;