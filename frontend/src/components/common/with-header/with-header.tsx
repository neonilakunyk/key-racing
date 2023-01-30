/* eslint-disable no-constant-condition */
import { useAppSelector } from '../../../hooks/hooks';
import { Spinner } from '../spinner/spinner';
import { Header } from './header/header';
import styles from './styles.module.scss';

export const WithHeader: React.FC<{ Component: React.FC }> = ({
  Component,
}) => {
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
