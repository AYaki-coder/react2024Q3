import { ReactNode, useState } from 'react';
import './pagination.css';

interface Props {
  readonly totalItems: number;
}

export function Pagination({ totalItems }: Props): ReactNode {
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemPerPage);

  return (
    <div className="pagination">
      <button
        type="button"
        className="btn-left"
        disabled={currentPage === 1}
        onClick={() => {
          setCurrentPage((c) => c - 1);
        }}
      >
        prev
      </button>
      <div className="page-info">
        page&nbsp;
        <span className="page-number">{currentPage}</span>
        &nbsp;of&nbsp;
        <span className="page-number">{totalPages}</span>
      </div>
      <button
        type="button"
        className="btn-right"
        disabled={currentPage === totalPages}
        onClick={() => {
          setCurrentPage((c) => c + 1);
        }}
      >
        next
      </button>
    </div>
  );
}
