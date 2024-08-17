import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import { Endpoints, Links } from '../../types';

interface Props {
  p1: Endpoints;
  p2: Endpoints;
  link1: Links;
  link2: Links;
}

export const Header: React.FC<Props> = ({ link1, link2, p1, p2 }) => {
  return (
    <header className={s.header}>
      <NavLink className={s.link} to={p1}>
        To {link1}
      </NavLink>
      <NavLink className={s.link} to={p2}>
        To {link2}
      </NavLink>
    </header>
  );
};
