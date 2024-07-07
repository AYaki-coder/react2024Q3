import { Component, ReactNode } from 'react';
import './App.css';
import { PersonResponse } from './types';
import { PersonList } from './components/person-list/person-list';
import { SearchPanel } from './components/search-panel/search-panel';

interface State {
  search: string;
}

const tmpresp: {
  results: Array<PersonResponse>;
} = {
  // count: 37,
  // next: 'https://swapi.dev/api/people/?search=L&page=2',
  // previous: null,
  results: [
    {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: [
        'https://swapi.dev/api/films/1/',
        'https://swapi.dev/api/films/2/',
        'https://swapi.dev/api/films/3/',
        'https://swapi.dev/api/films/6/',
      ],
      species: [],
      vehicles: ['https://swapi.dev/api/vehicles/14/', 'https://swapi.dev/api/vehicles/30/'],
      starships: ['https://swapi.dev/api/starships/12/', 'https://swapi.dev/api/starships/22/'],
      created: '2014-12-09T13:50:51.644000Z',
      edited: '2014-12-20T21:17:56.891000Z',
      url: 'https://swapi.dev/api/people/1/',
    },
    {
      name: 'Leia Organa',
      height: '150',
      mass: '49',
      hair_color: 'brown',
      skin_color: 'light',
      eye_color: 'brown',
      birth_year: '19BBY',
      gender: 'female',
      homeworld: 'https://swapi.dev/api/planets/2/',
      films: [
        'https://swapi.dev/api/films/1/',
        'https://swapi.dev/api/films/2/',
        'https://swapi.dev/api/films/3/',
        'https://swapi.dev/api/films/6/',
      ],
      species: [],
      vehicles: ['https://swapi.dev/api/vehicles/30/'],
      starships: [],
      created: '2014-12-10T15:20:09.791000Z',
      edited: '2014-12-20T21:17:50.315000Z',
      url: 'https://swapi.dev/api/people/5/',
    },
    {
      name: 'Owen Lars',
      height: '178',
      mass: '120',
      hair_color: 'brown, grey',
      skin_color: 'light',
      eye_color: 'blue',
      birth_year: '52BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/5/', 'https://swapi.dev/api/films/6/'],
      species: [],
      vehicles: [],
      starships: [],
      created: '2014-12-10T15:52:14.024000Z',
      edited: '2014-12-20T21:17:50.317000Z',
      url: 'https://swapi.dev/api/people/6/',
    },
    {
      name: 'Beru Whitesun lars',
      height: '165',
      mass: '75',
      hair_color: 'brown',
      skin_color: 'light',
      eye_color: 'blue',
      birth_year: '47BBY',
      gender: 'female',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/5/', 'https://swapi.dev/api/films/6/'],
      species: [],
      vehicles: [],
      starships: [],
      created: '2014-12-10T15:53:41.121000Z',
      edited: '2014-12-20T21:17:50.319000Z',
      url: 'https://swapi.dev/api/people/7/',
    },
    {
      name: 'Biggs Darklighter',
      height: '183',
      mass: '84',
      hair_color: 'black',
      skin_color: 'light',
      eye_color: 'brown',
      birth_year: '24BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: ['https://swapi.dev/api/films/1/'],
      species: [],
      vehicles: [],
      starships: ['https://swapi.dev/api/starships/12/'],
      created: '2014-12-10T15:59:50.509000Z',
      edited: '2014-12-20T21:17:50.323000Z',
      url: 'https://swapi.dev/api/people/9/',
    },
    {
      name: 'Anakin Skywalker',
      height: '188',
      mass: '84',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '41.9BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: ['https://swapi.dev/api/films/4/', 'https://swapi.dev/api/films/5/', 'https://swapi.dev/api/films/6/'],
      species: [],
      vehicles: ['https://swapi.dev/api/vehicles/44/', 'https://swapi.dev/api/vehicles/46/'],
      starships: [
        'https://swapi.dev/api/starships/39/',

        'https://swapi.dev/api/starships/59/',
        'https://swapi.dev/api/starships/65/',
      ],
      created: '2014-12-10T16:20:44.310000Z',
      edited: '2014-12-20T21:17:50.327000Z',
      url: 'https://swapi.dev/api/people/11/',
    },
    {
      name: 'Wilhuff Tarkin',
      height: '180',
      mass: 'unknown',
      hair_color: 'auburn, grey',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '64BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/21/',
      films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/6/'],
      species: [],
      vehicles: [],
      starships: [],
      created: '2014-12-10T16:26:56.138000Z',
      edited: '2014-12-20T21:17:50.330000Z',
      url: 'https://swapi.dev/api/people/12/',
    },
    {
      name: 'Han Solo',
      height: '180',
      mass: '80',
      hair_color: 'brown',
      skin_color: 'fair',
      eye_color: 'brown',
      birth_year: '29BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/22/',
      films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/2/', 'https://swapi.dev/api/films/3/'],
      species: [],
      vehicles: [],
      starships: ['https://swapi.dev/api/starships/10/', 'https://swapi.dev/api/starships/22/'],
      created: '2014-12-10T16:49:14.582000Z',
      edited: '2014-12-20T21:17:50.334000Z',
      url: 'https://swapi.dev/api/people/14/',
    },
    {
      name: 'Jabba Desilijic Tiure',
      height: '175',
      mass: '1,358',
      hair_color: 'n/a',
      skin_color: 'green-tan, brown',
      eye_color: 'orange',
      birth_year: '600BBY',
      gender: 'hermaphrodite',
      homeworld: 'https://swapi.dev/api/planets/24/',
      films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/3/', 'https://swapi.dev/api/films/4/'],
      species: ['https://swapi.dev/api/species/5/'],
      vehicles: [],
      starships: [],
      created: '2014-12-10T17:11:31.638000Z',
      edited: '2014-12-20T21:17:50.338000Z',
      url: 'https://swapi.dev/api/people/16/',
    },
    {
      name: 'Wedge Antilles',
      height: '170',
      mass: '77',
      hair_color: 'brown',
      skin_color: 'fair',
      eye_color: 'hazel',
      birth_year: '21BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/22/',
      films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/2/', 'https://swapi.dev/api/films/3/'],
      species: [],
      vehicles: ['https://swapi.dev/api/vehicles/14/'],
      starships: ['https://swapi.dev/api/starships/12/'],
      created: '2014-12-12T11:08:06.469000Z',
      edited: '2014-12-20T21:17:50.341000Z',
      url: 'https://swapi.dev/api/people/18/',
    },
  ],
};

interface Props {}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      search: localStorage.getItem('search') ?? '',
    };
  }

  componentDidMount(): void {}

  handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const newValue = e.currentTarget.value;
    console.log('newValue', newValue);
    this.setState({ search: newValue });
  };

  handleButtonClick = (): void => {
    localStorage.setItem('search', this.state.search);
  };

  render(): ReactNode {
    console.log('render', this.state);
    return (
      <>
        <header>
          <SearchPanel
            handleButtonClick={this.handleButtonClick}
            handleChange={this.handleChange}
            value={this.state.search}
          />
        </header>
        <PersonList personList={tmpresp.results} />
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
