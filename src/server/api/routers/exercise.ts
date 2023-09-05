import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const exerciseRouter = createTRPCRouter({
  getRandomExercise: privateProcedure.query(async ({ ctx }) => {
    const res = await ctx.prisma.exercise.findMany({
      where: { userId: ctx.userId },
      select: {
        exerciseName: true,
      },
    });
    const randomIndex = Math.floor(Math.random() * res.length);
    const randomExercise = res[randomIndex]?.exerciseName;
    const chartData = await ctx.prisma.exercise.findMany({
      where: {
        userId: ctx.userId,
        exerciseName: randomExercise,
      },
      orderBy: { createdAt: "asc" },
      select: {
        weight: true,
      },
    });
    return { exerciseName: randomExercise, data: chartData };
  }),
});
