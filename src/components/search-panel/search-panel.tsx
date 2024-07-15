import { ReactNode } from 'react';
import './search-panel.css';

interface Props {
  readonly value: string;
  readonly handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
  readonly handleButtonClick: (page?: number) => void;
}

export function SearchPanel({ value, handleChange, handleButtonClick }: Props): ReactNode {
  return (
    <div className="search-container">
      <input
        onChange={handleChange}
        value={value}
        type="search"
        name="search"
        className="search btn-left"
        placeholder="start searching..."
        autoComplete="off"
      />
      <button
        onClick={() => {
          handleButtonClick(1);
        }}
        type="button"
        className="btn-search btn-right"
      >
        search
      </button>
    </div>
  );
}
