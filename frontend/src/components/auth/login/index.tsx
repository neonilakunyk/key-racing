import { AppRoute } from 'common/enums';
import { FormField, FormPasswordField, Link, Sign } from '../../common';
import { loginSchema } from 'common/validations';
import {
  useAppDispatch,
  useHistory,
  useForm,
  yupResolver,
  useAppSelector,
  useEffect,
} from 'hooks';
import { authActions } from 'store/actions';
import { ILogin } from 'common/interfaces';
import { FieldType } from 'common/enums';
import { getAllowedClasses } from 'common/helpers';
import styles from './styles.module.scss';
import commonStyles from '../styles.module.scss';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { push } = useHistory();
  const { generalError, user } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({ resolver: yupResolver(loginSchema) });

  const handleSubmitForm = (data: ILogin): void => {
    dispatch(authActions.login(data));
  };

  useEffect(() => {
    if (!generalError && user?.id) {
      push(AppRoute.ROOT);
    }
  }, [generalError, user?.id]);

  return (
    <Sign
      generalError={generalError}
      header="Welcome back"
      secondaryText="Sign in to your account to continue"
      submitText="Sign in"
      onSubmit={handleSubmit(handleSubmitForm)}
      submitClassName={commonStyles.submitButton}
      altRoute={{
        // prettier-ignore
        question: 'Don\'t have an account?',
        linkText: 'Sign up',
        route: AppRoute.SIGN_UP,
      }}
    >
      <FormField
        label="Email"
        type={FieldType.EMAIL}
        placeholder="Enter your email"
        controlId="loginEmail"
        register={register('email')}
        errors={errors.email}
        inputClassName={commonStyles.input}
      />
      <FormPasswordField
        register={register('password')}
        label="Password"
        placeholder="Enter your password"
        errors={errors.password}
        inputClassName={commonStyles.input}
        helper={
          <Link
            className={getAllowedClasses(styles.link)}
            to={AppRoute.RESET_PASSWORD}
          >
            Forgot password?
          </Link>
        }
      />
    </Sign>
  );
};

export { Login };
