import { ReactNode, useEffect, useState } from 'react';
import './App.css';
import { Person } from './types';
import { PersonList } from './components/person-list/person-list';
import { SearchPanel } from './components/search-panel/search-panel';
import { ApiService } from './service/api-service';
import { ErrorButton } from './components/error-button/error-button';
import { Loader } from './components/loader/loader';

function App({ apiService }: { readonly apiService: ApiService }): ReactNode {
  const [search, setSearch] = useState(localStorage.getItem('search') || '');
  const [personList, setPersonList] = useState<Person[]>([]);
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getPersonList();
  }, []);

  function getPersonList(): void {
    setIsLoading(true);
    apiService
      .getAllPersons(search)
      .then((res) => {
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

  function handleButtonClick(): void {
    localStorage.setItem('search', search);
    getPersonList();
  }

  return (
    <>
      <header>
        <SearchPanel handleButtonClick={handleButtonClick} handleChange={handleChange} value={search} />
      </header>
      {isLoading ? (
        <Loader />
      ) : (
        <PersonList personList={personList} errorStatus={errorStatus} errorMessage={errorMessage} />
      )}
      <footer>
        <ErrorButton />
      </footer>
    </>
  );
}

export default App;
