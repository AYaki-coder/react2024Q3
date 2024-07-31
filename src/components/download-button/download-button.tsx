import { useContext } from 'react';
import { ThemeContext } from '../../context/theme-context';
import { useAppSelector } from '../../store/storeHooks';
import { Person } from '../../types';
import './download-button.css';

export const DownLoadButton: React.FC = () => {
  const theme = useContext(ThemeContext);

  const selectedPersons = useAppSelector((state) => state.selectedPersons.list);

  const convertToCSV = () => {
    return (
      MakeCSVLine(Object.keys(selectedPersons[0])) +
      selectedPersons.reduce((acc: string, person: Person) => acc + MakeCSVLine(Object.values(person)), '')
    );
  };

  const MakeCSVLine = (arr: string[]): string => {
    const newStr = arr.reduce((acc: string, value: string | string[]) => {
      const subStr = Array.isArray(value) ? `"${value.filter((x) => x).join(',')}",` : `"${value}",`;

      return acc + subStr;
    }, '');
    return newStr.slice(0, -1) + '\r\n';
  };

  const csvData = new Blob([convertToCSV()], { type: 'text/csv' });
  const csvURL = URL.createObjectURL(csvData);
  const personsCount = selectedPersons.length;

  return (
    <a href={csvURL} download={`${`${personsCount}_person${personsCount === 1 ? '' : 's'}`}.csv`}>
      <button className={`${'main-action-btn'} ${theme}`} type="button">
        download
      </button>
    </a>
  );
};
