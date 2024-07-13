import { ReactNode, useEffect, useState } from 'react';
import './detailed-person.css';
import { Person } from '../../types';
import { useSearchParams } from 'react-router-dom';
import { apiService } from '../../service/api-service';
import { Loader } from '../loader/loader';

export function DetailedPerson(): ReactNode {
  const [params, setParams] = useSearchParams();
  const [person, setPerson] = useState<null | Person>(null);
  const [isLoading, setIsLoading] = useState(true);
  const personId = params.get('personId');

  useEffect(() => {
    if (!personId) {
      return setPerson(null);
    }
    setIsLoading(true);
    apiService
      .getPerson(personId)
      .then((p) => setPerson(p))
      .finally(() => setIsLoading(false));
  }, [personId]);

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
      p.delete(`personId`);
      return p;
    });
  }

  return !personId ? null : (
    <div className="detailed-person">
      {isLoading ? (
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
