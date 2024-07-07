import { PureComponent, ReactNode } from 'react';
import './person.css';
import { PersonResponse } from '../../types';

interface Props {
  person: Readonly<PersonResponse>;
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
      <li className="person" key={name}>
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
