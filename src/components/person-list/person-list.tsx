import { PureComponent, ReactNode } from 'react';
import { PersonResponse } from '../../types';
import './person-list.css';
import { Person } from '../person/person';

interface Props {
  personList: Array<Readonly<PersonResponse>>;
}

export class PersonList extends PureComponent<Props> {
  render(): ReactNode {
    return (
      <div className="result-container">
        {this.props.personList.length > 0 && (
          <ul>
            {this.props.personList.map((x) => (
              <Person person={x} />
            ))}
          </ul>
        )}
        {this.props.personList.length === 0 && <div>no results</div>}
      </div>
    );
  }
}
