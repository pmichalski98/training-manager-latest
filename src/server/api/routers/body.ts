import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import z from "zod";
import { TRPCError } from "@trpc/server";

export const bodyRouter = createTRPCRouter({
  addWeight: privateProcedure
    .input(z.number().gt(0))
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
});
