import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  login: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.userId) throw new Error("User not authorized");
    const user = await ctx.prisma.user.findUnique({
      where: { id: ctx.userId },
    });
    if (!user) {
      return ctx.prisma.user.create({ data: { id: ctx.userId } });
    }
    return user;
  }),
  getTrainingsCount: privateProcedure.query(async ({ ctx }) => {
    const trainingsCount = await ctx.prisma.training.count({
      where: {
        userId: ctx.userId,
      },
    });

    const res = await ctx.prisma.trainingUnit.count({
      where: { userId: ctx.userId },
      skip: trainingsCount,
    });
    if (!res) {
      return null;
    } else {
      return res;
    }
  }),
  getCaloricTarget: privateProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { id: ctx.userId },
      select: {
        caloricTarget: true,
      },
    });
    if (!user) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    return user.caloricTarget;
  }),
  setCaloricTarget: privateProcedure
    .input(z.object({ target: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.prisma.user.update({
        where: {
          id: ctx.userId,
        },
        data: { caloricTarget: input.target },
      });
      if (!res) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      return res;
    }),
});
