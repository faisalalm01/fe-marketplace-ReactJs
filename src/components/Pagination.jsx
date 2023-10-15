import React from "react";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
    return (
      <div className="mb-20 text-center space-x-5">
        <button className="bg-orange-700 text-white font-semibold px-3 py-2 hover:bg-orange-600 rounded-md" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Prev
        </button>
        <span>{currentPage}{totalPages}</span>
        <button className="bg-orange-700 text-white font-semibold px-3 py-2 hover:bg-orange-600 rounded-md" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
        </button>
      </div>
    );
  }
export default Pagination;