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
    const res = await ctx.prisma.trainingUnit.count({
      where: { userId: ctx.userId },
    });
    if (!res) {
      return null;
    } else {
      return res;
    }
  }),
});
