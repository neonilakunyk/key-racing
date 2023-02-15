import { getAllowedClasses, replaceIdParam } from 'common/helpers';
import { useAppSelector, useHistory, useAppDispatch } from 'hooks';
import { authActions, settingsActions } from 'store/actions';
import { AppRoute, LocalStorageVariable } from 'common/enums';
import { Link, Profile } from 'components/common';
import { NavItem } from './components';

import styles from './styles.module.scss';

const Header: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = (): void => {
    dispatch(authActions.reset());
    dispatch(authActions.logout());
    dispatch(settingsActions.reset());
    localStorage.removeItem(LocalStorageVariable.ACCESS_TOKEN);
    localStorage.removeItem(LocalStorageVariable.REFRESH_TOKEN);

    history.push(AppRoute.LOGIN);
  };
  return (
    user && (
      <header
        className={getAllowedClasses(
          styles.header,
          'd-flex shadow align-items-center',
        )}
      >
        <div
          className={getAllowedClasses(
            styles.actions,
            'd-flex justify-content-start',
          )}
        >
          <Link to={replaceIdParam(AppRoute.GAME, user.id) as AppRoute}>
            <NavItem iconName="bi bi-person" label="Single player" />
          </Link>
          <Link to={AppRoute.ROOMS}>
            <NavItem iconName="bi bi-people" label="Multi player" />
          </Link>
          <Link to={AppRoute.THEORY}>
            <NavItem iconName="bi bi-book" label="Theory" />
          </Link>
          <Link to={AppRoute.RATING}>
            <NavItem iconName="bi bi-award" label="Rating" />
          </Link>
        </div>
        <div
          className={getAllowedClasses(
            styles.controls,
            'd-flex justify-content-end',
          )}
        >
          <Link to={AppRoute.ROOT}>
            <Profile
              userName={user.fullName}
              userAvatar={user.photoUrl ?? ''}
              textSize="fs-5"
              avatarSize="43"
              textColor="text-white"
            />
          </Link>
          <Link to={AppRoute.SETTINGS}>
            <NavItem iconName="bi bi-gear" />
          </Link>
          <NavItem iconName="bi bi-box-arrow-right" onClick={handleLogout} />
        </div>
      </header>
    )
  );
};

export { Header };
