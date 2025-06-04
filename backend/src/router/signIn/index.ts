import { trpc } from '../../lib/trpc';
import { zSignInTrpcInput } from './input';
import { getPasswordHash } from '../../utils';

export const signInIdeaTrpcRoute = trpc.procedure
  .input(zSignInTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const _user = ctx.prisma.user.findFirst({
      where: {
        nick: input.nick,
        password: getPasswordHash(input.password),
      },
    });

    if (!_user) {
      throw new Error('wrong nick or password');
    }

    return true;
  });
