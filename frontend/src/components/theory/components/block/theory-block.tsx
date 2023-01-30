import React from 'react';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  title: string;
  tip?: string;
};

export const TheoryBlock: React.FC<Props> = ({ children, title, tip }) => {
  return (
    <div className={getAllowedClasses('columns d-flex justify-content-around', styles.columns)}>
      <div className={getAllowedClasses('col-2', styles.leftSide)}>
        <h4 className={styles.title}>{title}</h4>
        {tip && (
          <div className={getAllowedClasses('mt-4 me-5 shadow-sm', styles.tip)}>
            <p>
              <strong>Tip: </strong>
              {tip}
            </p>
          </div>
        )}
      </div>
      <div className={getAllowedClasses('col-10', styles.text)}>{children}</div>
    </div>
  );
};
