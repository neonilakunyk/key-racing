import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  label?: string;
  iconName?: string;
  onClick?: () => void
};

export const NavItem: React.FC<Props> = ({ label, iconName, onClick }) => (
  <button className={styles.button} onClick={onClick}>
    <i className={getAllowedClasses(styles.bellIcon, iconName)}></i>
    <div className={styles.buttonLabel}>{label}</div>
  </button>
);
