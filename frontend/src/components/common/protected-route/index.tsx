import { Redirect, Route, RouteProps } from 'react-router-dom';
import { AppRoute, LocalStorageVariable } from 'common/enums';
import { useLocation, useAppSelector, useEffect, useHistory } from 'hooks';

const ProtectedRoute = ({ ...rest }: RouteProps): JSX.Element => {
  const token = localStorage.getItem(LocalStorageVariable.ACCESS_TOKEN);
  const { pathname } = useLocation();
  const isAuth = ([AppRoute.LOGIN, AppRoute.SIGN_UP] as string[]).includes(
    pathname,
  );
  const { isRefreshTokenExpired } = useAppSelector((state) => state.auth);
  const history = useHistory();
  const location = useLocation();
  console.log(isRefreshTokenExpired, token, isAuth);
  useEffect(() => {
    if (token && isAuth) {
      history.push(AppRoute.ROOT);
    }
  }, []);

  useEffect(() => {
    if (isRefreshTokenExpired) {
      history.push(AppRoute.LOGIN);
    }
  }, [isRefreshTokenExpired]);

  if (token) {
    return <Route {...rest} />;
  } else {
    return (
      <Redirect
        to={{
          pathname: AppRoute.LOGIN,
          state: { requestedPage: location.pathname },
        }}
      />
    );
  }
};

export { ProtectedRoute };
