import { ReactNode, useContext, useEffect, useState } from 'react';
import './App.css';
import { Params } from './types';
import { PersonList } from './components/person-list/person-list';
import { SearchPanel } from './components/search-panel/search-panel';
import { ErrorButton } from './components/error-button/error-button';
import { Loader } from './components/loader/loader';
import { useLocalStorage } from './hooks/use-local-storage';
import { Pagination } from './components/pagination/pagination';
import { Outlet, useSearchParams } from 'react-router-dom';
import { DownLoadPanel } from './components/download-panel/download-panel';
import { useAppDispatch } from './store/storeHooks';
import { useGetPersonsQuery } from './store/personsApi';
import { setCurrentPersons, setTotalItems } from './store/currentPageSlice';
import { ThemeToggler } from './components/theme-toggler/theme-toggler';
import { ThemeContext } from './context/theme-context';

function App(): ReactNode {
  const dispatch = useAppDispatch();
  const systemTheme = useContext(ThemeContext);
  const [theme, setTheme] = useLocalStorage(systemTheme, 'app-theme');

  const [params, setParams] = useSearchParams();
  const [request, setRequest] = useLocalStorage(params.get(Params.Search) ?? '', 'search');
  const [search, setSearch] = useState(request);

  const searchRequest = params.get(Params.Search) ?? '';
  const page = params.get(Params.Page) ?? '';

  const { data, isLoading, isFetching, isError } = useGetPersonsQuery({ search: searchRequest, page });

  useEffect(() => {
    if (data) {
      dispatch(setCurrentPersons(data.results));
      dispatch(setTotalItems(data.count));
    }
  }, [data, dispatch]);

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setSearch(e.currentTarget.value);
  };

  const handleButtonClick = (e: React.SyntheticEvent): void => {
    e.stopPropagation();
    dispatch(setTotalItems(0));
    const currentPage = '1';
    setRequest(search);
    setParams({ [Params.Page]: currentPage, [Params.Search]: search });
  };

  const changeTheme = (theme: string): void => {
    setTheme(theme);
  };

  const asideClick = () => {
    setParams((p) => {
      p.delete(Params.PersonId);
      return p;
    });
  };

  const pageClassName = theme === 'light' ? 'light page' : 'page';

  return (
    <ThemeContext.Provider value={theme}>
      <div className={pageClassName}>
        <aside className="main-page" onClick={asideClick}>
          <header>
            <SearchPanel handleButtonClick={handleButtonClick} handleChange={handleChange} value={search} />
            <ThemeToggler changeTheme={changeTheme} />
          </header>
          {isLoading || isFetching ? (
            <div className="main-loader">
              <Loader />
            </div>
          ) : (
            <>
              <PersonList errorStatus={isError} />
            </>
          )}

          <Pagination />

          <footer>
            <ErrorButton />
          </footer>
          <DownLoadPanel />
        </aside>
        <Outlet />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
