import { forwardRef, useState } from 'react';
import { FiAlertCircle, FiEye, FiEyeOff } from 'react-icons/fi';
import styles from './styles.module.scss';
import propTypes from 'prop-types';

const CustomInput = forwardRef(
  ({ label, placeholder, Icon, error, isPassword = false, isShowingPassword = false, showPassword, ...rest }, ref) => {
    const [isFocus, setIsFocus] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    function handleInputFocus() {
      setIsFocus(true);
    }

    function handleInputBlur(event) {
      setIsFocus(false);
      setIsFilled(!!event.target.value);
    }

    return (
      <div className={styles.container}>
        <label className={styles.label}>{label}</label>
        <div
          className={`${styles.content} ${isFilled && styles.filled} ${isFocus && styles.focus} ${
            error && styles.errorInput
          }`}
        >
          {Icon && <Icon size={24} />}
          <input
            {...rest}
            ref={ref}
            className={styles.input}
            placeholder={placeholder ?? label}
            onFocus={handleInputFocus}
            onBlur={(event) => handleInputBlur(event)}
          />

          {isPassword &&
            (isShowingPassword ? (
              <FiEye size={24} onClick={showPassword} className={styles.passwordEye} />
            ) : (
              <FiEyeOff size={24} onClick={showPassword} className={styles.passwordEye} />
            ))}
        </div>

        {error && (
          <div className={styles.error}>
            <FiAlertCircle />
            <p>{error.message}</p>
          </div>
        )}
      </div>
    );
  }
);

CustomInput.propTypes = {
  label: propTypes.string.isRequired,
  placeholder: propTypes.string,
  Icon: propTypes.func,
  isPassword: propTypes.bool,
  error: propTypes.object,
  showPassword: propTypes.func,
  isShowingPassword: propTypes.bool,
};

CustomInput.displayName = 'CustomInput';

export default CustomInput;
