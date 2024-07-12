import { ReactNode, useCallback, useEffect, useState } from 'react';
import './App.css';
import { Person } from './types';
import { PersonList } from './components/person-list/person-list';
import { SearchPanel } from './components/search-panel/search-panel';
import { ApiService } from './service/api-service';
import { ErrorButton } from './components/error-button/error-button';
import { Loader } from './components/loader/loader';
import { useLocalStorage } from './hooks/use-local-storage';
import { Pagination } from './components/pagination/pagination';

function App({ apiService }: { readonly apiService: ApiService }): ReactNode {
  const [request, setRequest] = useLocalStorage('', 'search');
  const [search, setSearch] = useState(request);
  const [personList, setPersonList] = useState<Person[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getPersonList();
  }, []);

  function getPersonList(page?: string): void {
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
      .finally(() => setIsLoading(false));
  }

  function handleChange(e: React.FormEvent<HTMLInputElement>): void {
    setSearch(e.currentTarget.value);
  }

  const handleButtonClick = useCallback(
    (page?: string): void => {
      console.log({ page });
      setRequest(search);
      getPersonList(page);
    },
    [setRequest, getPersonList],
  );

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
          <Pagination totalItems={totalItems} />
        </>
      )}
      <footer>
        <ErrorButton />
      </footer>
    </>
  );
}

export default App;
