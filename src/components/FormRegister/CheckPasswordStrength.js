import zxcvbn from 'zxcvbn';

import css from './CheckPasswordStrength.module.scss';

export const CheckPasswordStrength = ({ password }) => {
  const testResult = zxcvbn(password);
  const num = (testResult.score * 100) / 4;

  const changePassword = () => ({
    width: `${num}%`,
  });

  return <div className={css.password} style={changePassword()}></div>;
};
