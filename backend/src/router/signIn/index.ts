import { trpc } from '../../lib/trpc';
import { zSignInTrpcInput } from './input';
import { getPasswordHash } from '../../utils';
import { signJWT } from '../../utils/signJWT';

export const signInIdeaTrpcRoute = trpc.procedure
  .input(zSignInTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const user = await ctx.prisma.user.findFirst({
      where: {
        nick: input.nick,
        password: getPasswordHash(input.password),
      },
    });

    if (!user) {
      throw new Error('wrong nick or password');
    }

    const token = signJWT(user.id);

    return { token };
  });
