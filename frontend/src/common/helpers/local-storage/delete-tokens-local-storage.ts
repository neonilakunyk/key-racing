import { LocalStorageVariable } from 'common/enums';

export const deleteTokensLocalStorage = (): void => {
  localStorage.removeItem(LocalStorageVariable.ACCESS_TOKEN);
  localStorage.removeItem(LocalStorageVariable.REFRESH_TOKEN);
};
