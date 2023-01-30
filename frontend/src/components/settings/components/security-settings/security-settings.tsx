import React from 'react';
import { Form } from 'react-bootstrap';
import {
  useState,
  useAppDispatch,
  useAppSelector,
  useEffect,
} from 'hooks/hooks';
import { settingsActions } from 'store/actions';
import { FieldType } from 'common/enums/enums';
import styles from './styles.module.scss';

export const SecuritySettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const [checkedIsAllowedToShowInRating, setCheckedIsAllowedToShowInRating] =
    useState(false);

  const settings = useAppSelector((state) => state.settings);

  useEffect(() => {
    setCheckedIsAllowedToShowInRating(settings?.isUserVisibleInRating);
  }, [settings]);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCheckedIsAllowedToShowInRating(e.target.checked);
    dispatch(
      settingsActions.setSecuritySettings({
        isUserVisibleInRating: e.target.checked,
      }),
    );
  };

  return (
    <>
      <div className={styles.check}>
        <div>Show me in rating for other players:</div>
        <Form.Check
          className={styles.checkBox}
          disabled={settings.isCheckboxDisabled}
          type={FieldType.CHECKBOX}
          id="default-checkbox"
          checked={checkedIsAllowedToShowInRating}
          onChange={handleCheck}
          name="isAllowedToShowInRating"
        />
      </div>
    </>
  );
};
