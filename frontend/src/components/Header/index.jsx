import { MdLogout } from 'react-icons/md';
import { Button } from '../Button';
import styles from './styles.module.scss';
import { useAuth } from '../../hooks/auth';

export function Header() {
  const { signOut } = useAuth();

  function handleLogout() {
    signOut();
  }

  return (
    <div className={styles.container}>
      <h1>Cellphone Store</h1>

      <div className={styles.logout}>
        <Button title="LogOut" icon={<MdLogout />} type="button" onClick={handleLogout} />
      </div>
    </div>
  );
}
