import React from 'react';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  image: string;
};

export const TheoryCard: React.FC<Props> = ({ children, image }) => {
  return (
    <div className={getAllowedClasses('col-5 shadow', styles.card)}>
      {children}
      <div className={getAllowedClasses('shadow-sm p-1', styles.cardImageContainer)}>
        <img src={image} />
      </div>
    </div>
  );
};
