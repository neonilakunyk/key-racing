import { LocalStorageVariable } from '../../common/enums/enums';

export const deleteTokensLocalStorage = (): void => {
  localStorage.removeItem(LocalStorageVariable.ACCESS_TOKEN);
  localStorage.removeItem(LocalStorageVariable.REFRESH_TOKEN);
};
