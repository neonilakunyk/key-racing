import React from 'react';
import { Profile } from 'components/common/common';
import { IUserWithRecord } from 'common/interfaces/interfaces';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  number: number;
  user: IUserWithRecord;
};

export const RatingItem: React.FC<Props> = ({ number, user }) => {
  return (
    <div className={getAllowedClasses('d-flex justify-content-between', styles.rating)}>
      <div className={getAllowedClasses('userInfo-container d-flex', styles.container)}>
        <div className={getAllowedClasses('number mx-4 mt-2', styles.number)}>{number +1}</div>
        <div className={styles.user}>
          <Profile 
            userName={user.fullName}
            userAvatar={user.avatar}
            textSize="fs-6"
            avatarSize="28"
            textColor="text-dark"
          />
        </div>
      </div>
      <div className="record-container me-4 mt-2">
        <div className="record">{+user.record.toFixed(2)}</div>
      </div>
    </div>
  );
};
