import { Component, ReactNode } from 'react';
import './App.css';
import { Person } from './types';
import { PersonList } from './components/person-list/person-list';
import { SearchPanel } from './components/search-panel/search-panel';
import { ApiService } from './service/api-service';

interface State {
  search: string;
  personList: Array<Person>;
  errorStatus: boolean;
  errorMessage: string;
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
    };
  }

  componentDidMount(): void {
    this.getPersonList();
  }

  getPersonList(): void {
    this.props.apiService
      .getAllPersons(this.state.search)
      .then((res) => this.setState({ personList: res.results, errorStatus: false, errorMessage: '' }))
      .catch((e) => {
        this.setState({ errorStatus: true, errorMessage: e.message });
      });
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
    const { personList, errorStatus, errorMessage } = this.state;
    return (
      <>
        <header>
          <SearchPanel
            handleButtonClick={this.handleButtonClick}
            handleChange={this.handleChange}
            value={this.state.search}
          />
        </header>
        <PersonList personList={personList} errorStatus={errorStatus} errorMessage={errorMessage} />
        <footer>
          <button type="button" className="btn-large">
            big error button
          </button>
        </footer>
      </>
    );
  }
}

export default App;
