import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const statsRouter = createTRPCRouter({
  getExerciseList: privateProcedure.query(async ({ ctx }) => {
    const res = await ctx.prisma.exercise.findMany({
      where: {
        userId: ctx.userId,
      },
      select: {
        exerciseName: true,
      },
      distinct: ["exerciseName"],
    });
    if (!res) throw new TRPCError({ code: "NOT_FOUND" });
    return res;
  }),
  getChosenExercise: privateProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const res = await ctx.prisma.exercise.findMany({
        where: {
          userId: ctx.userId,
          exerciseName: input,
        },
      });
      if (!res) throw new TRPCError({ code: "BAD_REQUEST" });
      return res;
    }),
  getRandomExercise: privateProcedure.query(async ({ ctx }) => {
    const res = await ctx.prisma.exercise.findMany({
      where: { userId: ctx.userId },
      select: {
        exerciseName: true,
      },
    });
    const randomIndex = Math.floor(Math.random() * res.length);
    const randomExercise = res[randomIndex]?.exerciseName;
    console.log(randomExercise);
    const chartData = await ctx.prisma.exercise.findMany({
      where: {
        userId: ctx.userId,
        exerciseName: randomExercise,
      },
      orderBy: { createdAt: "asc" },
      skip: 1,
      select: {
        weight: true,
      },
    });
    return { exerciseName: randomExercise, data: chartData };
  }),
  getWeightData: privateProcedure.query(async ({ ctx }) => {
    const weightData = await ctx.prisma.weight.findMany({
      where: {
        userId: ctx.userId,
      },
      orderBy: { createdAt: "asc" },
      select: { weight: true, createdAt: true, id: true },
    });
    if (!weightData) throw new TRPCError({ code: "NOT_FOUND" });
    return weightData;
  }),
});
