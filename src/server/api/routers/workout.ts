import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { addWorkoutSchema, editWorkoutSchema } from "~/types/workout";
import { TRPCError } from "@trpc/server";
import z from "zod";

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
  deleteWorkout: privateProcedure
    .input(z.object({ workoutId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.prisma.training.delete({
        where: { id: input.workoutId },
      });
      if (!res) throw new TRPCError({ code: "NOT_FOUND" });
      return res;
    }),
  editWorkout: privateProcedure
    .input(editWorkoutSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.training.update({
        where: { id: input.id },
        data: {
          workoutName: input.workoutName,
          exercises: {
            deleteMany: {
              trainingId: input.id,
            },
            createMany: { data: input.exercises },
          },
        },
        include: { exercises: true },
      });
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
  getWorkouts: privateProcedure.query(async ({ ctx }) => {
    const res = await ctx.prisma.training.findMany({
      where: {
        userId: ctx.userId,
      },
      include: { exercises: true, trainingUnits: true },
      orderBy: { createdAt: "asc" },
    });
    if (!res) throw new TRPCError({ code: "NOT_FOUND" });
    return res;
  }),
});
