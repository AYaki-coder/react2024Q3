import { PureComponent, ReactNode } from 'react';
import './search-panel.css';

interface Props {
  value: string;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handleButtonClick: () => void;
}

export class SearchPanel extends PureComponent<Props> {
  render(): ReactNode {
    const { value, handleButtonClick, handleChange } = this.props;
    return (
      <div className="search-container">
        <input onChange={handleChange} value={value} type="search" name="search" className="search" />
        <button onClick={handleButtonClick} type="button" className="btn-search">
          search
        </button>
      </div>
    );
  }
}
