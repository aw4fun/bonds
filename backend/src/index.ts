import { AppContext, createAppContext } from './lib/ctx';
import express from 'express';
import cors from 'cors';
import { applyTrpcToExpressApp } from './lib/trpc';
import { trpcRouter } from './router';
import { applyPassportToExpressApp } from './lib/passport';
import { env } from './lib/env';

void (async () => {
  let ctx: AppContext | null = null;

  try {
    ctx = createAppContext();
    const expressApp = express();

    expressApp.use(cors());

    expressApp.get('/ping', (req, res) => {
      res.send('Pong!');
    });

    applyPassportToExpressApp(expressApp, ctx);

    await applyTrpcToExpressApp(expressApp, ctx, trpcRouter);

    expressApp.listen(env.PORT, () => {
      // eslint-disable-next-line no-console
      console.info(`Listening at http://localhost:${env.PORT}`);
    });
  } catch (err) {
    if (err instanceof Error) {
      // eslint-disable-next-line no-console
      console.error(err);
      await ctx?.stop();
    }
  }
})();
