import zxcvbn from 'zxcvbn';

import css from './PasswordStrengthMeter.module.scss';

const PasswordStrengthMeter = ({ password }) => {
  const testResult = zxcvbn(password);
  const num = (testResult.score * 100) / 4;

  const changePassword = () => ({
    width: `${num}%`,
  });

  return (
    <>
      <div className={css.PasswordStrengthMeter}>
        <div
          className={css.PasswordStrengthMeter__bar}
          style={changePassword()}
        ></div>
      </div>
    </>
  );
};

export default PasswordStrengthMeter;
