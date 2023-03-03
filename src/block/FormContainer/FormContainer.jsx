import css from './FormContainer.module.scss';
import { SelectCountry } from 'components/SelectCountry/SelectCountry';
import { ChangeMode } from 'components/ChangeMode/ChangeMode';
import { LogoNotMode } from 'components/Logo/Logo';

export const FormContainer = ({ title = 'Wallet', children, error = '' }) => {
  return (
    <div className={css.FormContainer}>
      <div className={css.menu}>
        <ChangeMode style={{ marginRight: 'auto' }} />
        <SelectCountry />
      </div>
      <div className={css.FormContainer__container}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '6px',
          }}
        >
          <LogoNotMode />
        </div>
        {children}
        {error && <p className={css.error}>{error}</p>}
      </div>
    </div>
  );
};
