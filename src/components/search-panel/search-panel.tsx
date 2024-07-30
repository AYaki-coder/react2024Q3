import { ReactNode, useContext } from 'react';
import './search-panel.css';
import { ThemeContext } from '../../context/theme-context';

interface Props {
  readonly value: string;
  readonly handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
  readonly handleButtonClick: (e: React.SyntheticEvent) => void;
}

export function SearchPanel({ value, handleChange, handleButtonClick }: Props): ReactNode {
  const theme = useContext(ThemeContext);
  return (
    <div className={`${'search-container'} ${theme}`}>
      <input
        onChange={handleChange}
        value={value}
        type="search"
        name="search"
        className="search btn-left"
        placeholder="start searching..."
        autoComplete="off"
      />
      <button onClick={handleButtonClick} type="button" className="btn-search btn-right">
        search
      </button>
    </div>
  );
}
