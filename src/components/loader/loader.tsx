import { ReactNode, useContext } from 'react';
import './loader.css';
import { ThemeContext } from '../../context/theme-context';

export function Loader(): ReactNode {
  const theme = useContext(ThemeContext);
  return <div className={`${'loader'} ${theme}`}></div>;
}
