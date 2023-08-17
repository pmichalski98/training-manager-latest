import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { addWorkoutSchema } from "~/types/workout";
import { TRPCError } from "@trpc/server";

export const workoutRouter = createTRPCRouter({
  getTrainingsCount: privateProcedure.query(async ({ ctx }) => {
    const res = await ctx.prisma.trainingUnit.count({
      where: { userId: ctx.userId },
    });
    if (!res) {
      return null;
    } else {
      return res;
    }
  }),
  addWorkout: privateProcedure
    .input(addWorkoutSchema)
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.prisma.training.create({
        data: {
          workoutName: input.workoutName,
          exercises: { createMany: { data: input.exercises } },
          userId: ctx.userId,
        },
      });
      if (!res) throw new TRPCError({ code: "BAD_REQUEST" });
      return res;
    }),
});
