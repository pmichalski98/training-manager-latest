import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import z from "zod";
import { TRPCError } from "@trpc/server";
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
});
