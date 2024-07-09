import { PureComponent, ReactNode } from 'react';
import { Person as PersonResponse } from '../../types';
import './person-list.css';
import { Person } from '../person/person';

interface Props {
  readonly personList: Array<Readonly<PersonResponse>>;
  readonly errorStatus: boolean;
  readonly errorMessage: string;
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
