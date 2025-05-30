import { trpc } from '../../lib/trpc';
import { ideas } from '../../lib/ideas';
import { zCreateIdeaTrpcInput } from './input';

export const createIdeaTrpcRoute = trpc.procedure
  .input(zCreateIdeaTrpcInput)
  .mutation(({ input }) => {
    if (ideas.find(({ nick }) => nick === input.nick)) {
      throw Error('Idea with this nick already exists');
    }

    ideas.unshift(input);
  });
