import Segment from '../../components/Segment';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import { useFormik } from 'formik';

import { withZodSchema } from 'formik-validator-zod';
import z from 'zod';
import { trpc } from '../../lib/trpc.tsx';

const NewIdeaPage = () => {
  const createIdea = trpc.createIdea.useMutation();

  const formik = useFormik({
    initialValues: { name: '', nick: '', description: '', text: '' },

    validate: withZodSchema(
      z.object({
        name: z.string().min(1),
        nick: z
          .string()
          .min(1)
          .regex(
            /^[a-z0-9-]+$/,
            'Nick may contain only lowercase letters, numbers and dashes'
          ),
        description: z.string().min(1),
        text: z.string().min(15, 'Text should be at least 100 characters long'),
      })
    ),
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
