import { useState } from 'react';
import { trpc } from '../../lib/trpc.tsx';
import { useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import z from 'zod';
import { zSignUpTrpcInput } from '@bonds/backend/src/router/signUp/input';
import Segment from '../../components/Segment';
import FormItems from '../../components/FormItems';
import Alert from '../../components/alert';
import Button from '../../components/button';
import Input from '../../components/Input';

export const SignUpPage = () => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [submittingError, setSubmittingError] = useState<string | null>(null);
  const signUp = trpc.signUp.useMutation();
  const formik = useFormik({
    initialValues: {
      nick: '',
      password: '',
      passwordAgain: '',
    },
    validate: withZodSchema(
      zSignUpTrpcInput
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
        })
    ),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null);
        await signUp.mutateAsync(values);
        formik.resetForm();
        setSuccessMessageVisible(true);
        setTimeout(() => {
          setSuccessMessageVisible(false);
        }, 3000);
      } catch (error) {
        if (error instanceof Error) {
          setSubmittingError(error?.message);
        }
      }
    },
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
          {!formik.isValid && !!formik.submitCount && (
            <Alert color="red">Some fields are invalid</Alert>
          )}
          {submittingError && <Alert color="red">{submittingError}</Alert>}
          {successMessageVisible && (
            <Alert color="green">Thanks for sign up!</Alert>
          )}
          <Button loading={formik.isSubmitting}>Sign Up</Button>
        </FormItems>
      </form>
    </Segment>
  );
};
