import { useParams } from 'react-router-dom';
import { getEditIdeaRoute, ViewIdeaRouteParams } from '../../lib/routes.ts';
import { trpc } from '../../lib/trpc.tsx';
import Segment from '../../components/Segment';
import { format } from 'date-fns';
import st from './ViewIdea.module.less';
import { LinkButton } from '../../components/Button';
import { withPageWrapper } from '../../lib/pageWrapper.tsx';

export const ViewIdeaPage = withPageWrapper({
  useQuery: () => {
    const { ideaNick } = useParams() as ViewIdeaRouteParams;
    return trpc.getIdea.useQuery({
      ideaNick,
    });
  },
  setProps: ({ queryResult, checkExists, ctx }) => ({
    idea: checkExists(queryResult.data.idea, 'Idea not found'),
    me: ctx.me,
  }),
})(({ idea, me }) => {
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
});
