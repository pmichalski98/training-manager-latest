import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

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
});
