import { trpc } from '../../lib/trpc';
import { ideas } from '../../lib/ideas';
import { zCreateIdeaTrpcInput } from './input';

export const createIdeaTrpcRoute = trpc.procedure
  .input(zCreateIdeaTrpcInput)
  .mutation(({ input }) => {
    ideas.unshift(input);
  });
