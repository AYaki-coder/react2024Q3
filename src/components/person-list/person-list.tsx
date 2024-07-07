import { PureComponent, ReactNode } from 'react';
import { Person as PersonResponse } from '../../types';
import './person-list.css';
import { Person } from '../person/person';

interface Props {
  personList: Array<Readonly<PersonResponse>>;
  errorStatus: boolean;
  errorMessage: string;
}

export class PersonList extends PureComponent<Props> {
  render(): ReactNode {
    return (
      <div className="result-container">
        {this.props.errorMessage && <div className="error">{this.props.errorMessage}</div>}
        {this.props.personList.length > 0 && (
          <ul>
            {this.props.personList.map((x) => (
              <Person person={x} key={x.name} />
            ))}
          </ul>
        )}
        {this.props.personList.length === 0 && <div className="noResults">no results</div>}
      </div>
    );
  }
}
