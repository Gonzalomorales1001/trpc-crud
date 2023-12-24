import { initTRPC } from '@trpc/server';

const t = initTRPC.context().create();

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;