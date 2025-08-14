import { trpc } from '../../../lib/trpc.tsx';
import Segment from '../../../components/Segment';
import FormItems from '../../../components/FormItems';
import Input from '../../../components/Input';
import Alert from '../../../components/Alert';
import { Button } from '../../../components/Button';
import { useForm } from '../../../lib/form.tsx';
import { withPageWrapper } from '../../../lib/pageWrapper.tsx';
import { zUpdateProfileTrpcInput } from '@bonds/backend/src/router/auth/updateProfile/input';

export const EditProfilePage = withPageWrapper({
  authorizedOnly: true,
  setProps: ({ getAuthorizedMe }) => ({ me: getAuthorizedMe() }),
})(({ me }) => {
  const trpcUtils = trpc.useContext();
  const updateProfile = trpc.updateProfile.useMutation();

  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      nick: me.nick,
      name: me.name,
    },
    validationSchema: zUpdateProfileTrpcInput,
    onSubmit: async (values) => {
      const updateMe = await updateProfile.mutateAsync(values);
      trpcUtils.getMe.setData(undefined, { me: updateMe });
    },
    successMessage: 'Update Profile',
    resetOnSuccess: false,
  });

  return (
    <Segment title="Edit Profile">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Nick" name="nick" formik={formik} />
          <Input label="Name" name="name" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Update</Button>
        </FormItems>
      </form>
    </Segment>
  );
});
