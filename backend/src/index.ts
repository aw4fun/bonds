import { AppContext, createAppContext } from './lib/ctx';
import express from 'express';
import cors from 'cors';
import { applyTrpcToExpressApp } from './lib/trpc';
import { trpcRouter } from './router';

void (async () => {
  let ctx: AppContext | null = null;

  try {
    ctx = createAppContext();
    const expressApp = express();

    expressApp.use(cors());

    expressApp.get('/ping', (req, res) => {
      res.send('Pong!');
    });

    applyTrpcToExpressApp(expressApp, ctx, trpcRouter);

    expressApp.listen(3000, () => {
      // eslint-disable-next-line no-console
      console.info('Listening at http://localhost:3000');
    });
  } catch (err) {
    if (err instanceof Error) {
      // eslint-disable-next-line no-console
      console.error(err);
      await ctx?.stop();
    }
  }
})();
