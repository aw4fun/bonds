import { trpc } from '../lib/trpc';
import { getIdeaTrpcRoute } from './ideas/getIdea';
import { getIdeasTrpcRoute } from './ideas/getIdeas';
import { createIdeaTrpcRoute } from './ideas/createIdea';
import { signUpIdeaTrpcRoute } from './auth/signUp';
import { signInIdeaTrpcRoute } from './auth/signIn';
import { getMeTrpcRoute } from './auth/getMe';
import { updateIdeaTrpcRoute } from './ideas/updateIdea';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

export const trpcRouter = trpc.router({
  getMe: getMeTrpcRoute,
  signUp: signUpIdeaTrpcRoute,
  signIn: signInIdeaTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  getIdeas: getIdeasTrpcRoute,
  createIdea: createIdeaTrpcRoute,
  updateIdea: updateIdeaTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>;
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>;
