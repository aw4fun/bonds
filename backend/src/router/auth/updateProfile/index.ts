import { trpc } from '../../../lib/trpc';
import { zUpdateProfileTrpcInput } from './input';
import { toClientMe } from '../../../lib/models';

export const updateProfileTrpcRoute = trpc.procedure
  .input(zUpdateProfileTrpcInput)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.me) {
      throw new Error('UNAUTHORIZED');
    }

    if (ctx.me.nick !== input.nick) {
      const exUser = await ctx.prisma.user.findUnique({
        where: { nick: input.nick },
      });

      if (exUser) {
        throw new Error('User wit this nick already exists');
      }
    }

    const updateMe = await ctx.prisma.user.update({
      where: { id: ctx.me.id },
      data: input,
    });

    ctx.me = updateMe;

    return toClientMe(updateMe);
  });
