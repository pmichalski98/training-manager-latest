import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import {
  addWorkoutSchema,
  editWorkoutSchema,
  trainingUnitSchema,
} from "~/types/workout";
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
  finishTrainingUnit: privateProcedure
    .input(trainingUnitSchema)
    .mutation(async ({ ctx, input }) => {
      const trainingUnit = await ctx.prisma.trainingUnit.create({
        data: {
          workoutName: input.workoutName,
          trainingId: input.id,
          userId: ctx.userId,
          createdAt: input.createdAt,
        },
      });
      input.exercises.map(async (exercise) => {
        await ctx.prisma.exercise.create({
          data: {
            trainingId: input.id,
            trainingUnitId: trainingUnit.id,
            sortIndex: exercise.sortIndex,
            exerciseName: exercise.exerciseName,
            trainingVolume: {
              createMany: {
                data: exercise.trainingVolume,
              },
            },
          },
        });
      });
    }),
  startTraining: privateProcedure
    .input(z.string().uuid())
    .query(async ({ ctx, input }) => {
      const trainingUnit = await ctx.prisma.trainingUnit.findMany({
        where: { trainingId: input },
        orderBy: { createdAt: "desc" },
        include: {
          exercises: {
            include: { trainingVolume: true },
            orderBy: { sortIndex: "asc" },
          },
        },
      });
      if (trainingUnit.length === 0) {
        const training = await ctx.prisma.training.findUnique({
          where: { id: input },
          include: { exercises: { include: { trainingVolume: true } } },
        });
        if (!training) throw new TRPCError({ code: "NOT_FOUND" });
        return training;
      }
      return trainingUnit[0];
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
      include: {
        exercises: { orderBy: { sortIndex: "asc" } },
      },
      orderBy: { createdAt: "asc" },
    });
    if (!res) throw new TRPCError({ code: "NOT_FOUND" });
    return res;
  }),
});
