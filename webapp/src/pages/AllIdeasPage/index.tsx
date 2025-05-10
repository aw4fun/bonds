import { trpc } from '../../lib/trpc';

const AllIdeasPage = () => {
  const { data, isLoading, error, isError, isFetching } =
    trpc.getIdeas.useQuery();

  if (isLoading || isFetching) {
    return <div>loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <h1>AllIdeasPage</h1>
      <ul>
        {data?.ideas.map(({ id, name, description }) => (
          <li key={id}>
            <h2>{name}</h2>
            <p>{description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllIdeasPage;
