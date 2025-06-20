import { initTRPC } from '@trpc/server';
import { type Express } from 'express';
import { TrpcRouter } from '../router';
import * as trpcExpress from '@trpc/server/adapters/express';
import { AppContext } from './ctx';
import superjson from 'superjson';
import { expressHandler } from 'trpc-playground/handlers/express';
import { ExpressRequest } from '../utils/types';

const getCreateTrpcContext =
  (appContext: AppContext) =>
  ({ req }: trpcExpress.CreateExpressContextOptions) => ({
    ...appContext,
    me: (req as ExpressRequest).user || null,
  });

type TrpcContext = Awaited<ReturnType<typeof getCreateTrpcContext>>;

export const trpc = initTRPC
  .context<TrpcContext>()
  .create({ transformer: superjson });

export const applyTrpcToExpressApp = async (
  expressApp: Express,
  appContext: AppContext,
  trpcRouter: TrpcRouter
) => {
  expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
      createContext: getCreateTrpcContext(appContext),
    })
  );

  expressApp.use(
    '/trpc-playground',
    await expressHandler({
      trpcApiEndpoint: '/trpc',
      playgroundEndpoint: '/trpc-playground',
      router: trpcRouter,
      request: {
        superjson: true,
      },
    })
  );
};
