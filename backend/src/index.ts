import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { trpcRouter } from './trpc';
import cors from 'cors';

const expressApp = express();

expressApp.use(cors());

expressApp.get('/ping', (req, res) => {
  res.send('Pong!');
});

const xsx: string = '2';

// eslint-disable-next-line no-console
console.log(xsx);

expressApp.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({ router: trpcRouter })
);

expressApp.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.info('Listening at http://localhost:3000');
});
