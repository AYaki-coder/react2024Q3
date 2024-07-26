import './pagination.css';
import { useAppSelector } from '../../store/storeHooks';
import { useSearchParams } from 'react-router-dom';
import { Params } from '../../types';

export const Pagination: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const currentPage = params.get(Params.Page) || '1';
  const totalItems = useAppSelector((state) => state.currentPage.totalItems);
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
    <div className="pagination">
      <button
        type="button"
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
  );
};
