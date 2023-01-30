import { AppRoute, LocalStorageVariable } from '../../common/enums/enums';
import { Route, Switch, WithHeader } from 'components/common/common';
import NotFound from 'components/not-found/not-found';
import { Root } from 'components/root/root';
import { Settings } from 'components/settings/settings';
import { Theory } from 'components/theory/theory';
import { Rooms } from 'components/rooms/rooms';
import { Rating } from 'components/rating/rating';
import { Game } from 'components/game/game';
import { authActions, settingsActions } from 'store/actions';
import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';

export const Main: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const token = localStorage.getItem(LocalStorageVariable.ACCESS_TOKEN);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token && !user) {
      dispatch(authActions.loadUser());
    }
    dispatch(settingsActions.loadSettings());
  }, []);

  return (
    <Switch>
      <Route
        path={AppRoute.ROOT}
        render={(): JSX.Element => <WithHeader Component={Root} />}
        exact
      />
      <Route
        path={AppRoute.THEORY}
        render={(): JSX.Element => <WithHeader Component={Theory} />}
        exact
      />
      <Route
        path={AppRoute.ROOMS}
        render={(): JSX.Element => <WithHeader Component={Rooms} />}
        exact
      />
      <Route
        path={AppRoute.GAME}
        render={(): JSX.Element => <Game />}
        exact
      />
      <Route
        path={AppRoute.SETTINGS}
        render={(): JSX.Element => <WithHeader Component={Settings} />}
        exact
      />
      <Route
        path={AppRoute.RATING}
        render={(): JSX.Element => <WithHeader Component={Rating} />}
        exact
      />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};
