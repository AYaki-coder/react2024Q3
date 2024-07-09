import { PureComponent, ReactNode } from 'react';
import './person.css';
import { Person as PersonResponse } from '../../types';

interface Props {
  readonly person: Readonly<PersonResponse>;
  readonly key: string;
}

export class Person extends PureComponent<Props> {
  render(): ReactNode {
    const {
      person: {
        name,
        height,
        mass,
        hair_color: hairColor,
        skin_color: skinColor,
        eye_color: eyeColor,
        gender,
        birth_year: birthYear,
      },
    } = this.props;

    return (
      <li className="person">
        <div className="title">{name}</div>
        <div className="description">
          <div>
            <span className="description-title">height: </span>
            {height ?? 'N/A'}
          </div>
          <div>
            <span className="description-title">mass: </span>
            {mass ?? 'N/A'}
          </div>
          <div>
            <span className="description-title">hair color: </span>
            {hairColor ?? 'N/A'}
          </div>
          <div>
            <span className="description-title">skin color: </span>
            {skinColor ?? 'N/A'}
          </div>
          <div>
            <span className="description-title"> eye color: </span>
            {eyeColor ?? 'N/A'}
          </div>
          <div>
            <span className="description-title">birth year: </span>
            {birthYear ?? 'N/A'}
          </div>
          <div>
            <span className="description-title">gender: </span>
            {gender ?? 'N/A'}
          </div>
        </div>
      </li>
    );
  }
}
