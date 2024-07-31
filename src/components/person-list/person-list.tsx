import './person-list.css';
import { Person } from '../person/person';
import { useAppSelector } from '../../store/storeHooks';
import { useContext } from 'react';
import { ThemeContext } from '../../context/theme-context';

interface Props {
  readonly errorStatus: boolean;
}

export const PersonList: React.FC<Props> = ({ errorStatus }: Props) => {
  const theme = useContext(ThemeContext);
  const persons = useAppSelector((state) => state.currentPage.list);

  return (
    <div className={`${'result-container'} ${theme}`}>
      {errorStatus && <div className="noResults">An Error has occurred</div>}
      {persons.length > 0 && (
        <ul>
          {persons.map((x) => (
            <Person person={x} key={x.name} />
          ))}
        </ul>
      )}
      {!errorStatus && persons.length === 0 && <div className="noResults">no results</div>}
    </div>
  );
};
