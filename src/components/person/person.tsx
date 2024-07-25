import './person.css';
import { Person as PersonResponse } from '../../types';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import { toggleSelected } from '../../store/personSelectedSlice';

export const Person: React.FC<{ person: Readonly<PersonResponse> }> = ({ person }) => {
  const [params, setParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const {
    name,
    height,
    mass,
    hair_color: hairColor,
    skin_color: skinColor,
    eye_color: eyeColor,
    gender,
    birth_year: birthYear,
    url,
  } = person;

  const id: string = url.split('/').reverse()[1];
  const persons = useAppSelector((state) => state.persons.list);
  const hasPerson = !!persons.some((p) => p.name === name);

  const onClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();

    setParams((currentParams) => {
      currentParams.set(`personId`, id);
      return params;
    });
  };

  return (
    <div className="person" onClick={onClick}>
      <input
        className="person-checkbox"
        type="checkbox"
        checked={hasPerson}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onChange={() => dispatch(toggleSelected(person))}
      />
      <div>
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
      </div>
    </div>
  );
};
