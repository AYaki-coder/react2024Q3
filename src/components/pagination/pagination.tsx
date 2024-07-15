import { ReactNode } from 'react';
import './pagination.css';

interface Props {
  readonly totalItems: number;
  readonly currentPage: number;
  readonly changePage: (currentPage: number, shouldIncrement: boolean) => void;
}

export function Pagination({ totalItems, currentPage, changePage }: Props): ReactNode {
  const itemPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemPerPage);

  return (
    <div className="pagination">
      <button
        type="button"
        className="btn-left"
        disabled={currentPage === 1}
        onClick={() => {
          changePage(currentPage, false);
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
          changePage(currentPage, true);
        }}
      >
        next
      </button>
    </div>
  );
}
