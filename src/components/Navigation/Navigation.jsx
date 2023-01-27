import { StyledLink } from './Navigation.styled';
import Media from 'react-media';

import css from './Navigation.module.css';
import sprite from '../../images/icons/icons.svg';

export const Navigation = () => {
  return (
    <section className={css.navigation}>
      <StyledLink to="" end>
        <svg className={css.navigation__icon}>
          <use href={sprite + '#home'}></use>
        </svg>
        <Media query="(min-width:768px)" render={() => <>Home</>} />
      </StyledLink>
      <StyledLink to="statistics">
        <svg className={css.navigation__icon}>
          <use href={sprite + '#statistic'}></use>
        </svg>
        <Media query="(min-width:768px)" render={() => <>Statistics</>} />
      </StyledLink>
      <Media
        query="(max-width:768px)"
        render={() => (
          <StyledLink to="currency">
            <svg className={css.navigation__icon}>
              <use href={sprite + '#currency'}></use>
            </svg>
          </StyledLink>
        )}
      />
    </section>
  );
};
