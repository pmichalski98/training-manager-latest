import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "~/server/api/routers/user";
import { trainingRouter } from "~/server/api/routers/training";
import { exerciseRouter } from "~/server/api/routers/exercise";
import { trainingUnitRouter } from "~/server/api/routers/trainingUnit";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  training: trainingRouter,
  exercise: exerciseRouter,
  trainingUnit: trainingUnitRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
