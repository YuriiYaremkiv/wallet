import { NavLink } from 'react-router-dom';
import css from './NavlinkTo.module.scss';

export const NavlinkTo = ({ title = 'LINK', to }) => {
  return (
    <NavLink to={to} className={css.RegisterForm_Navlink}>
      {title}
    </NavLink>
  );
};
