import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import {
  addTrainingSchema,
  editTrainingSchema,
  trainingUnitSchema,
} from "~/types/training";
import { TRPCError } from "@trpc/server";
import z from "zod";

export const trainingRouter = createTRPCRouter({
  deleteTraining: privateProcedure
    .input(z.object({ trainingId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.prisma.training.delete({
        where: { trainingId: input.trainingId },
      });
      if (!res) throw new TRPCError({ code: "NOT_FOUND" });
      return res;
    }),
  editTraining: privateProcedure
    .input(editTrainingSchema)
    .mutation(({ ctx, input }) => {
      const data = input.exercises.map((exercise) => {
        return {
          userId: ctx.userId,
          ...exercise,
        };
      });
      return ctx.prisma.training.update({
        where: { trainingId: input.trainingId },
        data: {
          trainingName: input.trainingName,
          exercises: {
            deleteMany: {
              trainingId: input.trainingId,
            },
            createMany: { data },
          },
        },
        include: { exercises: true },
      });
    }),
  finishTrainingUnit: privateProcedure
    .input(trainingUnitSchema)
    .mutation(async ({ ctx, input }) => {
      console.log(input, "server");
      const data = input.exercises.map((exercise) => {
        return {
          userId: ctx.userId,
          ...exercise,
        };
      });
      const trainingUnit = await ctx.prisma.trainingUnit.create({
        data: {
          createdAt: input.createdAt,
          trainingName: input.trainingName,
          trainingId: input.trainingId,
          userId: ctx.userId,
          exercises: {
            createMany: { data },
          },
        },
      });
      if (!trainingUnit) throw new TRPCError({ code: "BAD_REQUEST" });
      return { affectedRecords: 1 };
    }),
  startTraining: privateProcedure
    .input(z.string().uuid())
    .query(async ({ ctx, input }) => {
      const trainingUnit = await ctx.prisma.trainingUnit.findMany({
        where: { trainingId: input },
        orderBy: { endedAt: "asc" },
        include: { exercises: { orderBy: { sortIndex: "asc" } } },
      });
      if (!trainingUnit) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      return trainingUnit.at(-1);
    }),
  addTraining: privateProcedure
    .input(addTrainingSchema)
    .mutation(async ({ ctx, input }) => {
      const data = input.exercises.map((exercise) => {
        return {
          userId: ctx.userId,
          ...exercise,
        };
      });
      const training = await ctx.prisma.training.create({
        data: {
          trainingName: input.trainingName,
          exercises: {
            createMany: { data },
          },
          userId: ctx.userId,
        },
      });
      const data1 = input.exercises.map((exercise) => {
        return {
          userId: ctx.userId,
          trainingId: training.trainingId,
          ...exercise,
        };
      });
      const trainingUnit = await ctx.prisma.trainingUnit.create({
        data: {
          trainingName: input.trainingName,
          createdAt: new Date(),
          trainingId: training.trainingId,
          userId: ctx.userId,
          exercises: {
            createMany: {
              data: data1,
            },
          },
        },
      });
      if (!training) throw new TRPCError({ code: "BAD_REQUEST" });
      if (!trainingUnit) throw new TRPCError({ code: "BAD_REQUEST" });
      return training;
    }),
  getTrainings: privateProcedure.query(async ({ ctx }) => {
    const res = await ctx.prisma.training.findMany({
      where: {
        userId: ctx.userId,
      },
      include: {
        trainingUnits: { orderBy: { endedAt: "desc" }, take: 1 },
        exercises: {
          orderBy: { sortIndex: "asc" },
        },
      },
    });
    if (!res) throw new TRPCError({ code: "NOT_FOUND" });
    return res;
  }),
});
