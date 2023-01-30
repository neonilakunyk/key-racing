import React from 'react';
import { RatingItem } from './components/components';
import { Page } from 'components/common/common';
import { useAppSelector, useAppDispatch, useEffect } from 'hooks/hooks';
import { ratingActions } from 'store/actions';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

export const Rating: React.FC = () => {
  const { users } = useAppSelector((state) => state.rating);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ratingActions.loadUsers());
  }, []);

  return (
    <Page heading="Rating">
      <div className={getAllowedClasses('shadow overflow-auto', styles.ratingList)}>
        <div className={styles.ratingListItems}>
          {users.map((user, i) => (
            <RatingItem key={user.id} user={user} number={i} />
          ))}
        </div>
      </div>
    </Page>
  );
};
