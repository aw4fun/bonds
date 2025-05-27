import _ from 'lodash';
import { trpc } from '../../lib/trpc';
import { ideas } from '../../lib/ideas';

export const getIdeasTrpcRoute = trpc.procedure.query(() => {
  return {
    ideas: ideas.map((idea) =>
      _.pick(idea, ['id', 'nick', 'name', 'description'])
    ),
  };
});
