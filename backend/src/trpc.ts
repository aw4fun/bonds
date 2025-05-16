import { initTRPC } from '@trpc/server';
import _ from 'lodash';

const ideas = _.times(100, (i) => ({
  id: i,
  nick: `some-nick-${i}`,
  name: `element ${i}`,
  description: `Element ${i}`,
}));

const trpc = initTRPC.create();

// eslint-disable-next-line no-console
console.log(trpc);

export const trpcRouter = trpc.router({
  getIdeas: trpc.procedure.query(() => {
    return {
      ideas: ideas.map((idea) =>
        _.pick(idea, ['id', 'nick', 'name', 'description'])
      ),
    };
  }),
});

export type TrpcRouter = typeof trpcRouter;
