import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const trainingUnitRouter = createTRPCRouter({
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
