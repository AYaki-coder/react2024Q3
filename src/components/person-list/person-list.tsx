import { Person as PersonResponse } from '../../types';
import './person-list.css';
import { Person } from '../person/person';

interface Props {
  readonly personList: Array<Readonly<PersonResponse>>;
  readonly errorStatus: boolean;
  readonly errorMessage: string;
}

export const PersonList: React.FC<Props> = ({ personList, errorStatus, errorMessage }: Props) => {
  return (
    <div className="result-container">
      {errorStatus && <div className="noResults">{errorMessage}</div>}
      {personList.length > 0 && (
        <ul>
          {personList.map((x) => (
            <Person person={x} key={x.name} />
          ))}
        </ul>
      )}
      {personList.length === 0 && <div className="noResults">no results</div>}
    </div>
  );
};
