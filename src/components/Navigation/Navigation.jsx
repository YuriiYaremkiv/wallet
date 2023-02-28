import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { StyledLink } from './Navigation.styled';
import Media from 'react-media';
import sprite from '../../images/icons/icons.svg';
import modeConfig from 'configs/mode.config';
import css from './Navigation.module.scss';

export const Navigation = () => {
  const { themeMode } = useSelector(state => state.themeMode);
  const styles = modeConfig.style[themeMode];
  const { t } = useTranslation();

  return (
    <nav className={css.navigation}>
      <StyledLink to="" end style={{ ...styles.textColor }}>
        <svg className={css.navigation__icon}>
          <use href={sprite + '#home'}></use>
        </svg>
        <Media query="(min-width:768px)" render={() => <>{t('home')}</>} />
      </StyledLink>
      <StyledLink to="statistics" style={{ ...styles.textColor }}>
        <svg className={css.navigation__icon}>
          <use href={sprite + '#statistic'}></use>
        </svg>
        <Media
          query="(min-width:768px)"
          render={() => <>{t('statistics')}</>}
        />
      </StyledLink>
      <Media
        query="(max-width:768px)"
        render={() => (
          <StyledLink to="currency" style={{ ...styles.textColor }}>
            <svg className={css.navigation__icon}>
              <use href={sprite + '#currency'}></use>
            </svg>
          </StyledLink>
        )}
      />
    </nav>
  );
};
