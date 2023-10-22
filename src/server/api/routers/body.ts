import { TRPCError } from "@trpc/server";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { addMeasurementsSchema } from "~/types/body";

export const bodyRouter = createTRPCRouter({
  addNewMeasurements: privateProcedure
    .input(addMeasurementsSchema)
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.prisma.body.create({
        data: { ...input, userId: ctx.userId },
      });
      if (!res) throw new TRPCError({ code: "BAD_REQUEST" });
      return res;
    }),
  getMeasurements: privateProcedure.query(async ({ ctx }) => {
    const measurements = await ctx.prisma.body.findMany({
      where: {
        userId: ctx.userId,
      },
      orderBy: { createdAt: "asc" },
      select: {
        biceps: true,
        chest: true,
        hips: true,
        neck: true,
        thigh: true,
        waist: true,
      },
    });
    if (!measurements) return;

    function calculateDifference(lastValue: number, firstValue: number) {
      const diff = lastValue - firstValue;
      if (diff >= 0) {
        const positiveValue = "+".concat(diff.toFixed(1).toString());
        return positiveValue;
      }
      return diff.toFixed(1);
    }
    const firstEntry = Object.entries(measurements.at(0));
    const latestEntryValues = Object.values(
      measurements.at(measurements.length - 1)
    );

    const latestMeasurements = firstEntry.map((entry, index) => {
      const lastValue = latestEntryValues[index];
      const change = calculateDifference(lastValue!, entry[1] as number);
      return {
        bodypart: entry[0],
        firstValue: Number(entry[1]).toFixed(1),
        lastValue: lastValue?.toFixed(1),
        change,
      };
    });
    return latestMeasurements;
  }),
});
