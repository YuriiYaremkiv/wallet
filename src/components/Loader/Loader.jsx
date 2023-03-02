import { LinearProgress } from '@mui/material';
import { Logo } from 'components/Logo/Logo';
import css from './Loader.module.scss';

export const Loader = () => {
  return (
    <>
      <div className={css.loader}>
        <LinearProgress className={css.linear} />
        <div className={css.logo}>
          <Logo />
        </div>
      </div>
    </>
  );
};
