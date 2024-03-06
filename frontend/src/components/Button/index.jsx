import styles from './styles.module.scss';
import propTypes from 'prop-types';

export function Button({ title, icon, ...rest }) {
  return (
    <button {...rest} className={styles.button}>
      {title}
      {icon}
    </button>
  );
}

Button.propTypes = {
  title: propTypes.string.isRequired,
  icon: propTypes.node,
};
