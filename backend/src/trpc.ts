import { initTRPC } from '@trpc/server';
import _ from 'lodash';
import z from 'zod';

const ideas = _.times(100, (i) => ({
  id: i,
  nick: `some-nick-${i}`,
  name: `element ${i}`,
  description: `Element ${i}`,
  text: _.times(11, () => '<span>Lorem ipsum dolor.</span>').join(''),
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

  getIdea: trpc.procedure
    .input(
      z.object({
        ideaNick: z.string(),
      })
    )
    .query(({ input }) => {
      const idea = ideas.find((idea) => idea.nick === input.ideaNick);
      return { idea: idea || null };
    }),
});

export type TrpcRouter = typeof trpcRouter;
