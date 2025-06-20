import { trpc } from '../../../lib/trpc';
import { zCreateIdeaTrpcInput } from './input';

export const createIdeaTrpcRoute = trpc.procedure
  .input(zCreateIdeaTrpcInput)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.me) {
      throw Error('UNAUTHORIZED');
    }

    const _idea = await ctx.prisma.idea.findUnique({
      where: {
        nick: input.nick,
      },
    });

    if (_idea) {
      throw Error('Idea with this nick already exists');
    }

    await ctx.prisma.idea.create({
      data: { ...input, authorId: ctx.me.id },
    });

    return true;
  });
