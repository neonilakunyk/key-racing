import React from 'react';

import { getAllowedClasses } from 'helpers/helpers';
import { Spinner } from 'components/common/common';
import typingLaptop from '../../assets/img/typing-laptop.gif';
import styles from './styles.module.scss';

export const Root: React.FC = () => {
  if (!typingLaptop) {
    return <Spinner height={'12rem'} width={'12rem'} />;
  }
  return (
    <div
      className={getAllowedClasses(
        styles.homepageContainer,
        ' d-flex justify-content-center align-items-center',
      )}
    >
      <div>
        <img
          src={typingLaptop}
          alt="Typing on laptop"
          className={styles.typing}
        />
        <p>Type with us!</p>
      </div>
    </div>
  );
};
