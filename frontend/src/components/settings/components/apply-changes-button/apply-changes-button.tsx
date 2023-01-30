import React from 'react';
import { Button } from 'react-bootstrap';
import { getAllowedClasses } from '../../../../helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  onSubmit: () => void;
  isUploading?: boolean;
};

export const ApplyChangesButton: React.FC<Props> = ({
  onSubmit,
  isUploading = false,
}) => {
  return (
    <Button
      variant="success"
      className={getAllowedClasses(styles.button, 'd-flex justify-content-center')}
      onClick={onSubmit}
    >
      {isUploading ? 'Uploading…' : 'Apply changes'}
    </Button>
  );
};
