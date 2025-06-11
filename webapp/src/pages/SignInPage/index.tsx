import Cookies from 'js-cookie';
import { trpc } from '../../lib/trpc';
import { zSignInTrpcInput } from '@bonds/backend/src/router/signIn/input';
import Segment from '../../components/Segment';
import FormItems from '../../components/FormItems';
import Input from '../../components/Input';
import Alert from '../../components/Alert';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { getAllIdeasRoute } from '../../lib/routes.ts';
import { useForm } from '../../lib/form.tsx';

export const SignInPage = () => {
  const navigate = useNavigate();
  const trpcUtils = trpc.useContext();
  const signIn = trpc.signIn.useMutation();

  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      nick: '',
      password: '',
    },
    validationSchema: zSignInTrpcInput,
    onSubmit: async (values) => {
      const { token } = await signIn.mutateAsync(values);
      Cookies.set('token', token, { expires: 99999 });
      void trpcUtils.invalidate();
      navigate(getAllIdeasRoute());
    },
  });

  return (
    <Segment title="Sign In">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Nick" name="nick" formik={formik} />
          <Input
            label="Password"
            name="password"
            type="password"
            formik={formik}
          />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Sign In</Button>
        </FormItems>
      </form>
    </Segment>
  );
};
