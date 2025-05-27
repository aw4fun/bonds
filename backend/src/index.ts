import express from 'express';
import cors from 'cors';
import { applyTrpcToExpressApp } from './lib/trpc';
import { trpcRouter } from './router';

const expressApp = express();

expressApp.use(cors());

expressApp.get('/ping', (req, res) => {
  res.send('Pong!');
});

const xsx: string = '2';

// eslint-disable-next-line no-console
console.log(xsx);

applyTrpcToExpressApp(expressApp, trpcRouter);

expressApp.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.info('Listening at http://localhost:3000');
});
