import { Component, ReactNode } from 'react';
import './App.css';
import { Person } from './types';
import { PersonList } from './components/person-list/person-list';
import { SearchPanel } from './components/search-panel/search-panel';
import { ApiService } from './service/api-service';
import { ErrorButton } from './components/error-button/error-button';
import { Loader } from './components/loader/loader';

interface State {
  search: string;
  personList: Array<Person>;
  errorStatus: boolean;
  errorMessage: string;
  isLoading: boolean;
}

interface Props {
  readonly apiService: ApiService;
}

class App extends Component<Props, State> {
  constructor(readonly props: Props) {
    super(props);

    this.state = {
      search: localStorage.getItem('search') ?? '',
      personList: [],
      errorStatus: false,
      errorMessage: '',
      isLoading: false,
    };
  }

  componentDidMount(): void {
    this.getPersonList();
  }

  getPersonList(): void {
    this.setState({ isLoading: true });
    this.props.apiService
      .getAllPersons(this.state.search)
      .then((res) => this.setState({ personList: res.results, errorStatus: false, errorMessage: '' }))
      .catch((e) => {
        this.setState({ errorStatus: true, errorMessage: e.message });
      })
      .finally(() => this.setState({ isLoading: false }));
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const newValue = e.currentTarget.value;
    this.setState({ search: newValue });
  };

  handleButtonClick = (): void => {
    localStorage.setItem('search', this.state.search);
    this.getPersonList();
  };

  render(): ReactNode {
    const { personList, errorStatus, errorMessage, isLoading, search } = this.state;
    return (
      <>
        <header>
          <SearchPanel handleButtonClick={this.handleButtonClick} handleChange={this.handleChange} value={search} />
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
}

export default App;
