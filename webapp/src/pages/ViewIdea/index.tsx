import { useParams } from 'react-router-dom';
import { ViewIdeaRouteParams } from '../../lib/routes.ts';
import { trpc } from '../../lib/trpc.tsx';

const ViewIdeaPage = () => {
  const { ideaNick } = useParams() as ViewIdeaRouteParams;

  const { data, isLoading, error, isError, isFetching } = trpc.getIdea.useQuery(
    { ideaNick }
  );

  if (isLoading || isFetching) {
    return <div>loading....</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  if (!data?.idea) {
    return <span>idea not found</span>;
  }

  return (
    <div>
      <h1>{data?.idea.nick}</h1>
      <p>{data?.idea.description}</p>
      <div dangerouslySetInnerHTML={{ __html: data?.idea.text }}></div>
    </div>
  );
};

export default ViewIdeaPage;
