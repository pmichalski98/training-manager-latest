import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "~/server/api/routers/user";
import { trainingRouter } from "~/server/api/routers/training";
import { trainingUnitRouter } from "~/server/api/routers/trainingUnit";
import { photosRouter } from "~/server/api/routers/photos";
import { bodyRouter } from "~/server/api/routers/body";
import { statsRouter } from "~/server/api/routers/stats";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  training: trainingRouter,
  stats: statsRouter,
  trainingUnit: trainingUnitRouter,
  photos: photosRouter,
  body: bodyRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
