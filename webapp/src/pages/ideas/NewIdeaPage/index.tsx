import Segment from '../../../components/Segment';
import Input from '../../../components/Input';
import TextArea from '../../../components/TextArea';
import { trpc } from '../../../lib/trpc.tsx';

import { Button } from '../../../components/Button';
import FormItems from '../../../components/FormItems';
import Alert from '../../../components/Alert';
import { useForm } from '../../../lib/form.tsx';
import { withPageWrapper } from '../../../lib/pageWrapper.tsx';
import { zCreateIdeaTrpcInput } from '@bonds/backend/src/router/ideas/createIdea/input';

const NewIdeaPage = withPageWrapper({
  authorizedOnly: true,
})(() => {
  const createIdea = trpc.createIdea.useMutation();
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: { name: '', nick: '', description: '', text: '' },
    validationSchema: zCreateIdeaTrpcInput,
    onSubmit: async (values) => {
      await createIdea.mutateAsync(values);
      formik.resetForm();
    },
    successMessage: 'Idea created successfully.',
  });

  return (
    <Segment title="New Idea">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <FormItems>
          <Input name="name" label="Name" formik={formik} />
          <Input name="nick" label="Nick" formik={formik} />
          <Input
            name="description"
            label="Description"
            formik={formik}
            maxWidth={500}
          />
          <TextArea maxWidth={500} name="text" label="Text" formik={formik} />

          <Alert {...alertProps} />
          <Button {...buttonProps}>Create Idea</Button>
        </FormItems>
      </form>
    </Segment>
  );
});

export default NewIdeaPage;
