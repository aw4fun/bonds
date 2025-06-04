import { trpc } from '../../lib/trpc';
import { zSignUpTrpcInput } from './input';
import { getPasswordHash } from '../../utils';

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

    await ctx.prisma.user.create({
      data: {
        nick: input.nick,
        password: getPasswordHash(input.password),
      },
    });

    return true;
  });
