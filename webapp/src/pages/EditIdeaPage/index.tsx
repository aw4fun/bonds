import pick from 'lodash/pick';
import { useNavigate, useParams } from 'react-router-dom';
import { trpc } from '../../lib/trpc.tsx';
import { zUpdateIdeaTrpcInput } from '@bonds/backend/src/router/updateIdea/input';
import {
  type EditIdeaRouteParams,
  getViewIdeaRoute,
} from '../../lib/routes.ts';
import Segment from '../../components/Segment';
import FormItems from '../../components/FormItems/index.tsx';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Alert from '../../components/Alert';
import { Button } from '../../components/Button';
import type { TrpcRouterOutput } from '@bonds/backend/src/router/index.ts';
import { useForm } from '../../lib/form.tsx';
import { useMe } from '../../lib/ctx.tsx';

const EditIdeaComponent = ({
  idea,
}: {
  idea: NonNullable<TrpcRouterOutput['getIdea']['idea']>;
}) => {
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
};

export const EditIdeaPage = () => {
  const { ideaNick } = useParams() as EditIdeaRouteParams;

  const getIdeaResult = trpc.getIdea.useQuery({
    ideaNick,
  });
  const me = useMe();

  if (getIdeaResult.isLoading || getIdeaResult.isFetching) {
    return <span>Loading...</span>;
  }

  if (getIdeaResult.isError) {
    return <span>Error: {getIdeaResult.error.message}</span>;
  }

  if (!getIdeaResult?.data?.idea) {
    return <span>Idea not found</span>;
  }

  const idea = getIdeaResult.data.idea;

  if (!me) {
    return <span>Only for authorized</span>;
  }

  if (me.id !== idea.authorId) {
    return <span>An idea can only be edited by the author</span>;
  }

  return <EditIdeaComponent idea={idea} />;
};
