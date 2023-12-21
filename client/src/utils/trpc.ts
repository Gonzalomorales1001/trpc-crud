import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from '../../../src/app';

const trpc = createTRPCReact<AppRouter>();

export default trpc;