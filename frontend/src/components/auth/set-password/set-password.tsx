import { toast } from 'react-toastify';
import { Sign, FormPasswordField } from 'components/common/common';
import { HttpError } from 'exceptions/exceptions';
import { authApi } from 'services/services';
import { AppRoute, ToastMessage } from 'common/enums/enums';
import { setPasswordSchema } from 'common/validations/validations';
import { useForm, useHistory, yupResolver } from 'hooks/hooks';
import { ISetPasswordValidation } from 'common/interfaces/interfaces';

const SetPassword: React.FC = () => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISetPasswordValidation>({
    resolver: yupResolver(setPasswordSchema),
  });

  const query = new URLSearchParams(history.location.search);
  const token = query.get('token') || '';

  if (!token) {
    history.push(AppRoute.LOGIN);
  }

  const handleSubmitForm = async (
    data: ISetPasswordValidation,
  ): Promise<void> => {
    const { password } = data;
    try {
      await authApi.setPassword({
        password,
        token,
      });
      toast.success(ToastMessage.NEW_PASSWORD_SAVED);
      history.push(AppRoute.LOGIN);
    } catch (err) {
      const httpError = err as HttpError;
      toast.error(httpError.message);
    }
  };

  return (
    <Sign
      header="Set your new password"
      secondaryText="Enter your new password."
      submitText="Save"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <FormPasswordField
        label="Password"
        placeholder="Enter your new password"
        name="password"
        controlId="setPassword"
        register={register('password')}
        errors={errors.password}
      />
      <FormPasswordField
        label="Repeat password"
        placeholder="Repeat your new password"
        name="passwordRepeat"
        controlId="setPasswordRepeat"
        register={register('passwordRepeat')}
        errors={errors.passwordRepeat}
      />
    </Sign>
  );
};

export default SetPassword;
