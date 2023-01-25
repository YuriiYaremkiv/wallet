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
      <div className={css.progress}>
        <div className={css.progress_bar} style={changePassword()}></div>
      </div>
    </>
  );
};

export default PasswordStrengthMeter;
