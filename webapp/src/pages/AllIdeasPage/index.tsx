import { Link } from 'react-router-dom';
import { trpc } from '../../lib/trpc';
import { getViewIdeaRoute } from '../../lib/routes.ts';
import Segment from '../../components/Segment';

import st from './AllIdeas.module.less';

const AllIdeasPage = () => {
  const { data, isLoading, error, isError, isFetching } =
    trpc.getIdeas.useQuery();

  if (isLoading || isFetching) {
    return <div>loading....</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <Segment title="AllIdeasPage">
      <div>
        {data?.ideas.map(({ id, description, nick }) => (
          <div className={st.idea} key={id}>
            <Segment
              title={
                <Link to={getViewIdeaRoute({ ideaNick: nick })}>{nick}</Link>
              }
              size={2}
              description={description}
            />
          </div>
        ))}
      </div>
    </Segment>
  );
};

export default AllIdeasPage;
