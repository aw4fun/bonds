import { trpc } from '../lib/trpc';
import { getIdeaTrpcRoute } from './getIdea';
import { getIdeasTrpcRoute } from './getIdeas';
import { createIdeaTrpcRoute } from './createIdea';
import { signUpIdeaTrpcRoute } from './signUp';
import { signInIdeaTrpcRoute } from './signIn';
import { getMeTrpcRoute } from './getMe';

export const trpcRouter = trpc.router({
  getMe: getMeTrpcRoute,
  signUp: signUpIdeaTrpcRoute,
  signIn: signInIdeaTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  getIdeas: getIdeasTrpcRoute,
  createIdea: createIdeaTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
