import { TRPCError } from "@trpc/server";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { addMeasurementsSchema } from "~/types/body";
import z from "zod";

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
  getKcal: privateProcedure.query(async ({ ctx }) => {
    const kcal = await ctx.prisma.kcal.findMany({
      where: {
        userId: ctx.userId,
      },
      orderBy: { createdAt: "desc" },
    });
    if (!kcal) throw new TRPCError({ code: "BAD_REQUEST" });
    return kcal;
  }),
  getWeight: privateProcedure.query(async ({ ctx }) => {
    const weight = await ctx.prisma.weight.findMany({
      where: {
        userId: ctx.userId,
      },
      orderBy: { createdAt: "asc" },
    });
    if (!weight) throw new TRPCError({ code: "BAD_REQUEST" });
    const diffs = calculateDiff(weight);
    function calculateDiff(
      data: {
        id: string;
        weight: number;
        createdAt: Date;
        userId: string;
      }[]
    ) {
      let weights: number[] = [];
      data.forEach((entry) => {
        weights.push(entry.weight);
      });
      let diffs: number[] = [];
      for (let i = 0; i < weights.length - 1; i++) {
        const diff = weights[i + 1]! - weights[i]!;
        diffs.push(diff);
      }

      return diffs;
    }
    weight.reverse();
    diffs.reverse();
    const formatted = weight.map((weight, index) => {
      return {
        diff: diffs[index],
        ...weight,
      };
    });
    console.log(formatted);
    return formatted;
  }),
  addWeight: privateProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.prisma.weight.create({
        data: {
          weight: input,
          userId: ctx.userId,
        },
      });
      if (!res) throw new TRPCError({ code: "BAD_REQUEST" });
      return res;
    }),
  addKcal: privateProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.prisma.kcal.create({
        data: {
          kcal: input,
          userId: ctx.userId,
        },
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
        createdAt: true,
      },
    });
    if (!measurements) return;

    const filteredMeasurements = measurements.filter(
      (measurement, index) => index === 0 || index === measurements.length - 1
    );

    const dates = filteredMeasurements.map(
      (filteredMeasurement, i) => filteredMeasurement.createdAt
    );

    const filteredData = filteredMeasurements.map((measurement) => {
      return {
        biceps: measurement.biceps,
        chest: measurement.chest,
        hips: measurement.hips,
        neck: measurement.neck,
        thigh: measurement.thigh,
        waist: measurement.waist,
      };
    });

    function calculateDifference(lastValue: number, firstValue: number) {
      const diff = lastValue - firstValue;
      if (diff >= 0) {
        const positiveValue = "+".concat(diff.toFixed(1).toString());
        return positiveValue;
      }
      return diff.toFixed(1);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const firstEntry = Object.entries(filteredData.at(0));
    const latestEntryValues = Object.values(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      filteredData.at(filteredData.length - 1)
    );

    const latestMeasurements = firstEntry.map((entry, index) => {
      const lastValue = latestEntryValues[index];
      const change = calculateDifference(lastValue!, entry[1]);
      return {
        bodypart: entry[0],
        firstValue: Number(entry[1]).toFixed(1),
        lastValue: lastValue!.toFixed(1),
        change,
      };
    });
    return { latestMeasurements, dates };
  }),
});
