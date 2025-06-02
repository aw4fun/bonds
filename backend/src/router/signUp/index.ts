import { trpc } from '../../lib/trpc';
import { zSignUpTrpcInput } from './input';
import * as crypto from 'node:crypto';

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
        password: crypto
          .createHash('sha256')
          .update(input.password)
          .digest('hex'),
      },
    });

    return true;
  });
