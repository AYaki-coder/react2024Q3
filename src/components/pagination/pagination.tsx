import './pagination.css';
import { useAppSelector } from '../../store/storeHooks';
import { useSearchParams } from 'react-router-dom';
import { Params } from '../../types';
import { useContext } from 'react';
import { ThemeContext } from '../../context/theme-context';

export const Pagination: React.FC = () => {
  const theme = useContext(ThemeContext);
  const [params, setParams] = useSearchParams();
  const totalItems = useAppSelector((state) => state.currentPage.totalItems);
  const currentPage = totalItems ? params.get(Params.Page) || '1' : '';

  const itemPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemPerPage);

  const changePage = (currentPage: string, shouldIncrement: boolean): void => {
    let pageNum = +currentPage;
    const newCurrentPage = (shouldIncrement ? ++pageNum : --pageNum).toString();
    params.delete(Params.PersonId);
    params.set(Params.Page, newCurrentPage);

    setParams(params);
  };

  return (
    currentPage && (
      <div className={`${'pagination'} ${theme}`} data-testid="pagination">
        <button
          type="button"
          aria-label="prev"
          className="btn-left"
          disabled={currentPage === '1'}
          onClick={(e) => {
            e.stopPropagation();
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
          aria-label="next"
          className="btn-right"
          disabled={+currentPage === totalPages}
          onClick={(e) => {
            e.stopPropagation();
            changePage(currentPage, true);
          }}
        >
          next
        </button>
      </div>
    )
  );
};
