import { z } from "zod";

export type Training = z.infer<typeof addTrainingSchema>;
export type TrainingWithId = z.infer<typeof editTrainingSchema>;
export type trainingUnitSchema = z.infer<typeof trainingUnitSchema>;

export const addTrainingSchema = z.object({
  trainingName: z.string().min(1, { message: "Workout name cannot be empty" }),
  exercises: z.array(
    z.object({
      sortIndex: z.number(),
      exerciseName: z
        .string()
        .min(1, { message: "Exercise name cannot be empty" }),
    })
  ),
});
export const editTrainingSchema = z.object({
  trainingId: z.string().uuid(),
  trainingName: z.string().min(1, { message: "Workout name cannot be empty" }),
  exercises: z.array(
    z.object({
      sortIndex: z.number(),
      exerciseName: z
        .string()
        .min(1, { message: "Exercise name cannot be empty" }),
    })
  ),
});
export const trainingUnitSchema = z.object({
  trainingId: z.string().uuid(),
  createdAt: z.date(),
  trainingName: z.string().min(1, { message: "Workout name cannot be empty" }),
  exercises: z.array(
    z.object({
      trainingId: z.string().uuid(),
      sortIndex: z.number(),
      exerciseName: z
        .string()
        .min(1, { message: "Exercise name cannot be empty" }),
      sets: z.number(),
      rpe: z.number(),
      reps: z.number(),
      weight: z.number(),
    })
  ),
});
