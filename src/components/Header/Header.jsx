import { useSelector } from 'react-redux';
import { Logo } from 'components/Logo/Logo';
import { ChangeMode } from 'components/ChangeMode/ChangeMode';
import { SelectCountry } from 'components/SelectCountry/SelectCountry';
import { LogOutForm } from 'components/LogOutForm/LogOutForm';
import Media from 'react-media';
import modeConfig from 'configs/mode.config';
import css from './Header.module.scss';

export const Header = () => {
  const { themeMode } = useSelector(state => state.themeMode);
  const styles = modeConfig.style[themeMode];

  return (
    <header className={css.header} style={{ ...styles.backgroundColorHeader }}>
      <div className="container">
        <div className={css.header__container}>
          <Logo />
          <div className={css.menu}>
            <Media query="(min-width:768px)" render={() => <ChangeMode />} />
            <Media query="(min-width:480px)" render={() => <SelectCountry />} />
            <LogOutForm />
          </div>
        </div>
      </div>
    </header>
  );
};
