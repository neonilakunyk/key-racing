import { ToastContainer } from 'react-toastify';
import { Switch, Route } from 'react-router-dom';
import { AppRoute } from 'common/enums';
import { ProtectedRoute } from 'components/common';
import {
  Login,
  LoginGoogle,
  SignUp,
  SetPassword,
  ResetPassword,
} from 'components/auth';
import { Main } from 'components/main';
import { NotFound } from 'components/not-found';

const App: React.FC = () => {
  return (
    <>
      <Switch>
        <Route path={AppRoute.LOGIN} component={Login} exact />
        <Route path={AppRoute.LOGIN_GOOGLE} component={LoginGoogle} exact />
        <Route path={AppRoute.SIGN_UP} component={SignUp} exact />
        <Route path={AppRoute.RESET_PASSWORD} component={ResetPassword} exact />
        <Route path={AppRoute.SET_PASSWORD} component={SetPassword} exact />
        <ProtectedRoute path={AppRoute.ROOT} component={Main} />
        <Route path="*" component={NotFound} />
      </Switch>
      <ToastContainer />
    </>
  );
};

export { App };
