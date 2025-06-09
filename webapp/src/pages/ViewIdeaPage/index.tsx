import { useParams } from 'react-router-dom';
import { getEditIdeaRoute, ViewIdeaRouteParams } from '../../lib/routes.ts';
import { trpc } from '../../lib/trpc.tsx';
import Segment from '../../components/Segment';
import { format } from 'date-fns';
import st from './ViewIdea.module.less';
import { LinkButton } from '../../components/button';

export const ViewIdeaPage = () => {
  const { ideaNick } = useParams() as ViewIdeaRouteParams;

  const getIdeaResult = trpc.getIdea.useQuery({
    ideaNick,
  });
  const getMeResult = trpc.getMe.useQuery();

  if (
    getIdeaResult.isLoading ||
    getIdeaResult.isFetching ||
    getMeResult.isLoading ||
    getMeResult.isFetching
  ) {
    return <span>Loading...</span>;
  }

  if (getIdeaResult.isError) {
    return <span>Error: {getIdeaResult.error.message}</span>;
  }

  if (getMeResult.isError) {
    return <span>Error: {getMeResult.error.message}</span>;
  }

  if (!getIdeaResult?.data?.idea) {
    return <span>Idea not found</span>;
  }

  const idea = getIdeaResult.data.idea;
  const me = getMeResult?.data?.me;

  return (
    <Segment title={idea.name} description={idea.description}>
      <div className={st.createdAt}>
        Created At: {format(idea.createdAt, 'yyyy-MM-dd')}
      </div>
      <div className={st.author}>Author: {idea.author.nick}</div>
      <div
        className={st.text}
        dangerouslySetInnerHTML={{ __html: idea.text }}
      />
      {me?.id === idea.authorId && (
        <div className={st.editButton}>
          <LinkButton to={getEditIdeaRoute({ ideaNick: idea.nick })}>
            Edit Idea
          </LinkButton>
        </div>
      )}
    </Segment>
  );
};
