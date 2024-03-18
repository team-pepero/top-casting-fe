import React from 'react';

const Pagination = ({ currentPage, totalPages, onPrevPage, onNextPage }) => {
  return (
    <div>
      <button onClick={onPrevPage} disabled={currentPage === 0}>이전 페이지</button>
      <span>{currentPage + 1} / {totalPages}</span>
      <button onClick={onNextPage} disabled={currentPage === totalPages - 1}>다음 페이지</button>
    </div>
  );
};

export default Pagination;
