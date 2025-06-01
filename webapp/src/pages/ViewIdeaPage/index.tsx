import { useParams } from 'react-router-dom';
import { ViewIdeaRouteParams } from '../../lib/routes.ts';
import { trpc } from '../../lib/trpc.tsx';

import st from './ViewIdea.module.less';
import Segment from '../../components/Segment';

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

  if (!data) {
    return <span>idea not found</span>;
  }

  return (
    <Segment title={data?.nick} description={data?.description}>
      <div
        className={st.text}
        dangerouslySetInnerHTML={{ __html: data?.text }}
      />
    </Segment>
  );
};

export default ViewIdeaPage;
