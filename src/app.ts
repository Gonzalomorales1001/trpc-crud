import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
// import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { router } from './trpc';
import { notesRouter } from './routes/notes';
import path from 'path';

const app = express();
app.use(morgan('dev'));
app.use(cors());


const appRouter = router({
    note: notesRouter
});

app.use('/trpc', trpcExpress.createExpressMiddleware({
    router: appRouter
}));

app.use(express.static(path.join(__dirname, '../client/dist')));

export type AppRouter = typeof appRouter;

export default app;