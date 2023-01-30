import { SECOND_IN_MILLISECONDS } from '../../../common/constants/constants';

const setTimer = (
  startValue: number,
  action: () => void,
): void => {
  let limit = startValue;
  const timerIncreaser = (): void => {
    action();
    limit--;
    if (limit <= 0) {
      clearInterval(timer);
    }
  };
  const timer = setInterval(timerIncreaser, SECOND_IN_MILLISECONDS);
};

export { setTimer };
