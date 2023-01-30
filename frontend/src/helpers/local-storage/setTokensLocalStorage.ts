import { LocalStorageVariable } from '../../common/enums/enums';

export const setTokensLocalStorage = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}): void => {
  localStorage.setItem(LocalStorageVariable.ACCESS_TOKEN, accessToken);
  localStorage.setItem(LocalStorageVariable.REFRESH_TOKEN, refreshToken);
};
