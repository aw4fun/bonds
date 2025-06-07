import { trpc } from '../../lib/trpc';
import { zSignUpTrpcInput } from './input';
import { getPasswordHash } from '../../utils';
import { signJWT } from '../../utils/signJWT';

export const signUpIdeaTrpcRoute = trpc.procedure
  .input(zSignUpTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const _user = await ctx.prisma.user.findUnique({
      where: {
        nick: input.nick,
      },
    });

    if (_user) {
      throw new Error('User already exists');
    }

    const user = await ctx.prisma.user.create({
      data: {
        nick: input.nick,
        password: getPasswordHash(input.password),
      },
    });

    const token = signJWT(user.id);

    return { token };
  });
