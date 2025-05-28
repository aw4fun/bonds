import Segment from '../../components/Segment';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import { useFormik } from 'formik';

import { withZodSchema } from 'formik-validator-zod';
import { trpc } from '../../lib/trpc.tsx';
import { zCreateIdeaTrpcInput } from '@bonds/backend/src/router/createIdea/input.ts';

const NewIdeaPage = () => {
  const createIdea = trpc.createIdea.useMutation();

  const formik = useFormik({
    initialValues: { name: '', nick: '', description: '', text: '' },
    validate: withZodSchema(zCreateIdeaTrpcInput),
    onSubmit: async (values) => {
      await createIdea.mutateAsync(values);
    },
  });

  return (
    <Segment title="New Idea">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Input name="name" label="Name" formik={formik} />

        <Input name="nick" label="Nick" formik={formik} />

        <Input name="description" label="Description" formik={formik} />

        <TextArea name="text" label="Text" formik={formik} />
        {!formik.isValid && !!formik.submitCount && (
          <div style={{ color: 'red' }}>Some fields are invalid</div>
        )}
        <button type="submit">Create Idea</button>
      </form>
    </Segment>
  );
};

export default NewIdeaPage;
