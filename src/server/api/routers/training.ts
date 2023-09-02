import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import {
  addTrainingSchema,
  editTrainingSchema,
  trainingUnitSchema,
} from "~/types/training";
import { TRPCError } from "@trpc/server";
import z from "zod";

export const trainingRouter = createTRPCRouter({
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
      return ctx.prisma.training.update({
        where: { trainingId: input.trainingId },
        data: {
          trainingName: input.trainingName,
          exercises: {
            deleteMany: {
              trainingId: input.trainingId,
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
          createdAt: input.createdAt,
          trainingName: input.trainingName,
          trainingId: input.trainingId,
          userId: ctx.userId,
          exercises: {
            createMany: { data: input.exercises },
          },
        },
      });
      if (!trainingUnit) throw new TRPCError({ code: "BAD_REQUEST" });
      return { affectedRecords: 1 };
    }),
  startTraining: privateProcedure
    .input(z.string().uuid())
    .query(async ({ ctx, input }) => {
      console.log(input);
      const trainingUnit = await ctx.prisma.trainingUnit.findMany({
        where: { trainingId: input },
        orderBy: { endedAt: "asc" },
        include: { exercises: { orderBy: { sortIndex: "asc" } } },
      });
      if (trainingUnit.length === 0) {
        const training = await ctx.prisma.training.findUnique({
          where: { trainingId: input },
          include: { exercises: { orderBy: { sortIndex: "asc" } } },
        });
        if (!training) throw new TRPCError({ code: "NOT_FOUND" });
        console.log("t");
        return training;
      }
      console.log("unit");
      return trainingUnit[trainingUnit.length - 1];
    }),
  addTraining: privateProcedure
    .input(addTrainingSchema)
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.prisma.training.create({
        data: {
          trainingName: input.trainingName,
          exercises: { createMany: { data: input.exercises } },
          userId: ctx.userId,
        },
      });
      if (!res) throw new TRPCError({ code: "BAD_REQUEST" });
      return res;
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
