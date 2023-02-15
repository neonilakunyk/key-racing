/* eslint-disable no-constant-condition */
import { useAppSelector } from 'hooks';
import { Spinner } from '../spinner';
import { Header } from './header';
import styles from './styles.module.scss';

const WithHeader: React.FC<{ Component: React.FC }> = ({ Component }) => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className={styles.grid}>
      {!user && false ? (
        <Spinner height={'12rem'} width={'12rem'} />
      ) : (
        <>
          <div className={styles.header}>
            <Header />
          </div>
          <div className={styles.component}>
            <Component />
          </div>
        </>
      )}
    </div>
  );
};

export { WithHeader };
