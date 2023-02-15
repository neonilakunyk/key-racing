import React from 'react';
import { Form } from 'react-bootstrap';
import {
  useState,
  useAppDispatch,
  useEffect,
  useAppSelector,
  useForm,
  yupResolver,
} from 'hooks';
import { settingsActions } from 'store/actions';
import { ApplyChangesButton } from '../apply-changes-button';
import { FieldType } from 'common/enums';
import { IGameSettings } from 'common/interfaces';
import { gameSettingsSchema } from 'common/validations';
import {
  MAX_SECONDS_BEFORE_GAME,
  MAX_SECONDS_FOR_GAME,
  MIN_SECONDS_BEFORE_GAME,
  MIN_SECONDS_FOR_GAME,
} from 'common/constants';
import styles from './styles.module.scss';

const GameSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const [secondsBeforeGame, setSecondsBeforeGame] = useState(0);
  const [secondsForGame, setSecondsForGame] = useState(0);

  const settings = useAppSelector((state) => state.settings);

  useEffect(() => {
    if (settings?.secondsBeforeGame) {
      setSecondsBeforeGame(settings?.secondsBeforeGame);
    }
    if (settings?.secondsForGame) {
      setSecondsForGame(settings?.secondsForGame);
    }
  }, [settings]);

  const {
    register,
    formState: { errors },
  } = useForm<IGameSettings>({
    resolver: yupResolver(gameSettingsSchema),
  });

  const handleSaveChanges = async (): Promise<void> => {
    dispatch(
      settingsActions.setGameSettings({
        secondsBeforeGame,
        secondsForGame,
      }),
    );
  };

  const handleChangeSecondsBeforeGame = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    return setSecondsBeforeGame(+e.target.value);
  };
  const handleChangeSecondsForGame = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    return setSecondsForGame(+e.target.value);
  };

  return (
    <>
      <Form>
        <Form.Group
          className={styles.timerGroup}
          controlId="formGroupSecondsBeforeGame"
        >
          <div className={styles.timerContainer}>
            <Form.Label className="fs-5">
              Countdown before the game in the single mode (in seconds):
            </Form.Label>
            <Form.Control
              value={secondsBeforeGame}
              className={styles.timerField}
              {...register('secondsBeforeGame')}
              onChange={handleChangeSecondsBeforeGame}
              isInvalid={!!errors.secondsBeforeGame}
              type={FieldType.NUMBER}
              min={MIN_SECONDS_BEFORE_GAME}
              max={MAX_SECONDS_BEFORE_GAME}
            />
          </div>

          {errors.secondsBeforeGame && (
            <Form.Control.Feedback type="invalid">
              {errors?.secondsBeforeGame.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group
          className={styles.timerGroup}
          controlId="formGroupSecondsForGame"
        >
          <div className={styles.timerContainer}>
            <Form.Label>Game time for the single mode (in seconds):</Form.Label>
            <Form.Control
              value={secondsForGame}
              className={styles.timerField}
              {...register('secondsForGame')}
              onChange={handleChangeSecondsForGame}
              isInvalid={!!errors.secondsForGame}
              type={FieldType.NUMBER}
              min={MIN_SECONDS_FOR_GAME}
              max={MAX_SECONDS_FOR_GAME}
            />
          </div>
          {errors.secondsForGame && (
            <Form.Control.Feedback type="invalid">
              {errors?.secondsForGame.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>
      </Form>
      <ApplyChangesButton onSubmit={handleSaveChanges} />
    </>
  );
};

export { GameSettings };
