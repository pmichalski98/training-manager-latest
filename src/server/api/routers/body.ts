import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import z from "zod";
import { TRPCError } from "@trpc/server";
import { addMeasurementsSchema } from "~/types/body";
import { log } from "console";

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
        id: true,
        neck: true,
        thigh: true,
        waist: true,
      },
    });
    // turn this data into 1 object ### bodypart # fristentry # secondentry # difference
    const firstEntry = Object.entries(measurements.at(0));
    const latestEntry = Object.entries(
      measurements.at(measurements.length - 1)
    );

    console.log(firstEntry, latestEntry);

    // return latestMeasurements;
  }),
});
