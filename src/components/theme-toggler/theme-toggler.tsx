import { useContext } from 'react';
import './theme-toggler.css';
import { ThemeContext } from '../../context/theme-context';

interface Props {
  changeTheme: (theme: string) => void;
}

export const ThemeToggler: React.FC<Props> = ({ changeTheme }) => {
  const theme = useContext(ThemeContext);

  return (
    <div className={`${'toggle-container'} ${theme}`}>
      <input
        type="checkbox"
        className="checkbox"
        id="checkbox"
        onChange={(e) => {
          changeTheme(e.target.checked ? 'dark' : 'light');
        }}
        checked={theme === 'dark'}
      />
      <label htmlFor="checkbox" className="checkbox-label">
        <span className="ball"></span>
      </label>
    </div>
  );
};
