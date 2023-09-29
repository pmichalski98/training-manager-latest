import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import z from "zod";

export const trainingUnitRouter = createTRPCRouter({
  deleteTrainingUnit: privateProcedure
    .input(z.object({ trainingUnitId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.prisma.trainingUnit.delete({
        where: { id: input.trainingUnitId },
      });
      if (!res) throw new TRPCError({ code: "NOT_FOUND" });
      return res;
    }),
  getTrainingHistory: privateProcedure.query(async ({ ctx }) => {
    const trainingUnits = await ctx.prisma.trainingUnit.findMany({
      where: {
        userId: ctx.userId,
      },
      orderBy: { endedAt: "desc" },
      include: {
        exercises: true,
      },
    });
    if (!trainingUnits) throw new TRPCError({ code: "NOT_FOUND" });
    return trainingUnits;
  }),
});
