import Cookies from 'js-cookie';
import { trpc } from '../../../lib/trpc.tsx';
import Segment from '../../../components/Segment';
import FormItems from '../../../components/FormItems';
import Input from '../../../components/Input';
import Alert from '../../../components/Alert';
import { Button } from '../../../components/Button';
import { useForm } from '../../../lib/form.tsx';
import { withPageWrapper } from '../../../lib/pageWrapper.tsx';
import { zSignInTrpcInput } from '@bonds/backend/src/router/auth/signIn/input';

export const SignInPage = withPageWrapper({
  redirectAuthorized: true,
})(() => {
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
});
