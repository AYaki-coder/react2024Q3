import { ReactNode } from 'react';
import './search-panel.css';

interface Props {
  readonly value: string;
  readonly handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
  readonly handleButtonClick: () => void;
}

export function SearchPanel({ value, handleChange, handleButtonClick }: Props): ReactNode {
  return (
    <div className="search-container">
      <input
        onChange={handleChange}
        value={value}
        type="search"
        name="search"
        className="search"
        placeholder="start searching..."
        autoComplete="off"
      />
      <button onClick={handleButtonClick} type="button" className="btn-search">
        search
      </button>
    </div>
  );
}
