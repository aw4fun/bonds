import { Link } from 'react-router-dom';
import { trpc } from '../../lib/trpc';
import { getViewIdeaRoute } from '../../lib/routes.ts';

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
    <div>
      <h1>AllIdeasPage</h1>
      <div>
        {data?.ideas.map(({ id, description, nick }) => (
          <div className={st.idea}>
            <h2 key={id}>
              <Link to={getViewIdeaRoute({ ideaNick: nick })}>{nick}</Link>
              <p className={st.ideaDescription}>{description}</p>
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllIdeasPage;
