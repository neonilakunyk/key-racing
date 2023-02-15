import React from 'react';
import { RatingItem } from './components';
import { Page } from 'components/common';
import { useAppSelector, useAppDispatch, useEffect } from 'hooks';
import { ratingActions } from 'store/actions';
import { getAllowedClasses } from 'common/helpers';
import styles from './styles.module.scss';

const Rating: React.FC = () => {
  const { users } = useAppSelector((state) => state.rating);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ratingActions.loadUsers());
  }, []);

  return (
    <Page heading="Rating">
      <div
        className={getAllowedClasses('shadow overflow-auto', styles.ratingList)}
      >
        <div className={styles.ratingListItems}>
          {users.map((user, i) => (
            <RatingItem
              key={`${i}:${user.fullName}-${user.record}`}
              user={user}
              number={i}
            />
          ))}
        </div>
      </div>
    </Page>
  );
};

export { Rating };
