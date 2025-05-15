import { Link } from 'react-router-dom';
import { trpc } from '../../lib/trpc';
import { getViewIdeaRoute } from '../../lib/routes.ts';

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
      <ul>
        {data?.ideas.map(({ id, description, nick }) => (
          <li key={id}>
            <Link to={getViewIdeaRoute({ ideaNick: nick })}>
              <h2>{nick}</h2>
            </Link>
            <p>{description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllIdeasPage;
