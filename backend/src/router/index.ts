import { trpc } from '../lib/trpc';
import { getIdeaTrpcRoute } from './getIdea';
import { getIdeasTrpcRoute } from './getIdeas';
import { createIdeaTrpcRoute } from './createIdea';
import { signUpIdeaTrpcRoute } from './signUp';

export const trpcRouter = trpc.router({
  signUp: signUpIdeaTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  getIdeas: getIdeasTrpcRoute,
  createIdea: createIdeaTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
