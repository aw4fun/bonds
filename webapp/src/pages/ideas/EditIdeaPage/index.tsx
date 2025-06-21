import pick from 'lodash/pick';
import { useNavigate, useParams } from 'react-router-dom';
import { trpc } from '../../../lib/trpc.tsx';
import {
  type EditIdeaRouteParams,
  getViewIdeaRoute,
} from '../../../lib/routes.ts';
import Segment from '../../../components/Segment';
import FormItems from '../../../components/FormItems';
import Input from '../../../components/Input';
import TextArea from '../../../components/TextArea';
import Alert from '../../../components/Alert';
import { Button } from '../../../components/Button';
import { useForm } from '../../../lib/form.tsx';
import { withPageWrapper } from '../../../lib/pageWrapper.tsx';
import { zUpdateIdeaTrpcInput } from '@bonds/backend/src/router/ideas/updateIdea/input';

export const EditIdeaPage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    const { ideaNick } = useParams() as EditIdeaRouteParams;
    return trpc.getIdea.useQuery({ ideaNick });
  },
  checkExists: ({ queryResult }) => {
    return Boolean(queryResult?.data?.idea);
  },
  checkExistsMessage: 'Idea not found',
  checkAccess: ({ queryResult, ctx }) => {
    const idea = queryResult?.data?.idea;
    if (!idea) {
      return false;
    }
    return ctx.me?.id === idea.authorId;
  },
  checkAccessMessage: 'An idea can only be edited by the author',
  setProps: ({ queryResult, ctx, checkExists, checkAccess }) => {
    const idea = checkExists(queryResult.data.idea, 'Idea not found');
    checkAccess(
      ctx.me?.id === idea.authorId,
      'An idea can only be edited by the author'
    );
    return {
      idea,
    };
  },
})(({ idea }) => {
  const navigate = useNavigate();
  const updateIdea = trpc.updateIdea.useMutation();
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: pick(idea, ['name', 'nick', 'description', 'text']),
    validationSchema: zUpdateIdeaTrpcInput.omit({ ideaId: true }),
    onSubmit: async (values) => {
      await updateIdea.mutateAsync({ ideaId: idea.id, ...values });
      navigate(getViewIdeaRoute({ ideaNick: values.nick }));
    },
    resetOnSuccess: false,
    showValidationAlert: true,
  });

  return (
    <Segment title={`Edit Idea: ${idea.nick}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Name" name="name" formik={formik} />
          <Input label="Nick" name="nick" formik={formik} />
          <Input
            label="Description"
            name="description"
            maxWidth={500}
            formik={formik}
          />
          <TextArea label="Text" name="text" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Update Idea</Button>
        </FormItems>
      </form>
    </Segment>
  );
});
