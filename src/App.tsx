import { ReactNode, useEffect, useState } from 'react';
import './App.css';
import { Person } from './types';
import { PersonList } from './components/person-list/person-list';
import { SearchPanel } from './components/search-panel/search-panel';
import { ApiService } from './service/api-service';
import { ErrorButton } from './components/error-button/error-button';
import { Loader } from './components/loader/loader';
import { useLocalStorage } from './hooks/use-local-storage';
import { Pagination } from './components/pagination/pagination';
import { useSearchParams } from 'react-router-dom';

function App({ apiService }: { readonly apiService: ApiService }): ReactNode {
  const [params, setParams] = useSearchParams();
  const [request, setRequest] = useLocalStorage(params.get(Params.Search) ?? '', 'search');
  const [page, setPage] = useState(params.get(Params.Page) ?? '1');
  const [search, setSearch] = useState(request);
  const [personList, setPersonList] = useState<Person[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getPersonList(search, page);
  }, []);

  function getPersonList(search: string, page: string): void {
    console.log('getPersonList search:', search, ' page:', page);
    setIsLoading(true);
    apiService
      .getAllPersons(search, page)
      .then((res) => {
        setTotalItems(res.count);
        setPersonList(res.results);
        setErrorStatus(false);
        setErrorMessage('');
      })
      .catch((e) => {
        setErrorStatus(true);
        setErrorMessage(e.message);
      })
      .finally(() => {
        setParams({ [Params.Search]: search, [Params.Page]: page });
        setIsLoading(false);
      });
  }

  function handleChange(e: React.FormEvent<HTMLInputElement>): void {
    setSearch(e.currentTarget.value);
  }

  const handleButtonClick = (): void => {
    const currentPage = '1';
    setPersonList([]);
    setRequest(search);
    getPersonList(search, currentPage);
    setPage(currentPage);
  };

  const changePage = (currentPage: number, shouldIncrement: boolean): void => {
    const newCurrentPage = (shouldIncrement ? ++currentPage : --currentPage).toString();

    setPage(newCurrentPage);
    console.log('page', page);
    getPersonList(search, newCurrentPage);
  };

  return (
    <>
      <header>
        <SearchPanel handleButtonClick={handleButtonClick} handleChange={handleChange} value={search} />
      </header>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <PersonList personList={personList} errorStatus={errorStatus} errorMessage={errorMessage} />
        </>
      )}
      {personList.length > 0 && (
        <Pagination totalItems={totalItems} currentPage={Number(page)} changePage={changePage} />
      )}
      <footer>
        <ErrorButton />
      </footer>
    </>
  );
}

enum Params {
  Search = 'search',
  Page = 'page',
}

export default App;
