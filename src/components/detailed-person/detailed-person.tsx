import { ReactNode, useContext, useEffect, useState } from 'react';
import './detailed-person.css';
import { Params, Person } from '../../types';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../loader/loader';
import { useAppDispatch } from '../../store/storeHooks';
import { clearCurrentPerson, setCurrentPerson } from '../../store/detailedPersonSlice';
import { useGetQuery } from '../../store/personsApi';
import { ThemeContext } from '../../context/theme-context';

export function DetailedPerson(): ReactNode {
  const dispatch = useAppDispatch();
  const theme = useContext(ThemeContext);
  const [params, setParams] = useSearchParams();
  const [person, setPerson] = useState<null | Person>(null);
  const personId = params.get(Params.PersonId) ?? '';

  const { data, isLoading, isFetching } = useGetQuery(personId);

  useEffect(() => {
    if (!personId) {
      dispatch(clearCurrentPerson());
      return setPerson(null);
    }

    if (data) {
      dispatch(setCurrentPerson(data));
      setPerson(data);
    }
  }, [data, dispatch, personId]);

  const {
    name,
    height,
    mass,
    hair_color: hairColor,
    skin_color: skinColor,
    eye_color: eyeColor,
    gender,
    birth_year: birthYear,
  } = person ?? {};

  function close(e: React.SyntheticEvent): void {
    e.stopPropagation();

    setParams((p) => {
      p.delete(Params.PersonId);
      return p;
    });
  }

  return !personId ? null : (
    <div className={`${'detailed-person'} ${theme}`}>
      {isLoading || isFetching ? (
        <div className="detailed-loader">
          <Loader />
        </div>
      ) : !person ? null : (
        <>
          <div className="close-button" onClick={close}>
            x
          </div>
          <div className="detailed-info">
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
        </>
      )}
    </div>
  );
}
