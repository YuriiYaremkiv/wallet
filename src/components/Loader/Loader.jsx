import { useSelector } from 'react-redux';
import { LinearProgress } from '@mui/material';
import { Logo } from 'components/Logo/Logo';
import css from './Loader.module.scss';

export const Loader = () => {
  const { themeMode } = useSelector(state => state.themeMode);

  return (
    <>
      <div className={css[`loader__${themeMode}`]}>
        <LinearProgress className={css.linear} />
        <div className={css.logo}>
          <Logo />
        </div>
      </div>
    </>
  );
};
