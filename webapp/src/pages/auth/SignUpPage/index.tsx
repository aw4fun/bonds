import { trpc } from '../../../lib/trpc.tsx';
import z from 'zod';
import Segment from '../../../components/Segment';
import FormItems from '../../../components/FormItems';
import Alert from '../../../components/Alert';
import { Button } from '../../../components/Button';
import Input from '../../../components/Input';
import Cookies from 'js-cookie';
import { getAllIdeasRoute } from '../../../lib/routes.ts';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../../lib/form.tsx';
import { withPageWrapper } from '../../../lib/pageWrapper.tsx';
import { zSignUpTrpcInput } from '@bonds/backend/src/router/auth/signUp/input';

export const SignUpPage = withPageWrapper({
  redirectAuthorized: true,
})(() => {
  const navigate = useNavigate();
  const trpcUtils = trpc.useContext();
  const signUp = trpc.signUp.useMutation();
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      nick: '',
      password: '',
      passwordAgain: '',
    },
    validationSchema: zSignUpTrpcInput
      .extend({
        passwordAgain: z.string().min(1),
      })
      .superRefine((val, ctx) => {
        if (val.password !== val.passwordAgain) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Passwords must be the same',
            path: ['passwordAgain'],
          });
        }
      }),
    onSubmit: async (values) => {
      const { token } = await signUp.mutateAsync(values);
      Cookies.set('token', token, { expires: 99999 });
      void trpcUtils.invalidate();
      navigate(getAllIdeasRoute());
    },
    resetOnSuccess: false,
  });

  return (
    <Segment title="Sign Up">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Nick" name="nick" formik={formik} />
          <Input
            label="Password"
            name="password"
            type="password"
            formik={formik}
          />
          <Input
            label="Password again"
            name="passwordAgain"
            type="password"
            formik={formik}
          />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Sign Up</Button>
        </FormItems>
      </form>
    </Segment>
  );
});
