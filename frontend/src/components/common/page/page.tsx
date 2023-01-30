import React from 'react';
import { getAllowedClasses } from '../../../helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  heading: string;
};

export const Page: React.FC<Props> = ({ children, heading }) => {
  return (
    <div className={getAllowedClasses('d-flex justify-content-center', styles.container)}>
      <div className={getAllowedClasses('d-flex flex-column shadow-lg', styles.text)}>
        <div className={styles.heading}>
          {heading}
        </div>
        <hr />
        {children}
        <hr />
      </div>
    </div>

  );
};
