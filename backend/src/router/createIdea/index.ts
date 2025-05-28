import z from 'zod';
import { trpc } from '../../lib/trpc';
import { ideas } from '../../lib/ideas';

export const createIdeaTrpcRoute = trpc.procedure
  .input(
    z.object({
      name: z.string().min(1),
      nick: z
        .string()
        .min(1)
        .regex(
          /^[a-z0-9-]+$/,
          'Nick may contain only lowercase letters, numbers and dashes'
        ),
      description: z.string().min(1),
      text: z.string().min(15, 'Text should be at least 100 characters long'),
    })
  )
  .mutation(({ input }) => {
    ideas.unshift(input);
  });
