import { z } from "zod";

export type Workout = z.infer<typeof addWorkoutSchema>;
export type WorkoutWithId = z.infer<typeof editWorkoutSchema>;
export type trainingUnitSchema = z.infer<typeof trainingUnitSchema>;

export const addWorkoutSchema = z.object({
  workoutName: z.string().min(1, { message: "Workout name cannot be empty" }),
  exercises: z.array(
    z.object({
      sortIndex: z.number(),
      exerciseName: z
        .string()
        .min(1, { message: "Exercise name cannot be empty" }),
    })
  ),
});
export const editWorkoutSchema = z.object({
  id: z.string().uuid(),
  workoutName: z.string().min(1, { message: "Workout name cannot be empty" }),
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
  id: z.string().uuid(),
  createdAt: z.date(),
  workoutName: z.string().min(1, { message: "Workout name cannot be empty" }),
  exercises: z.array(
    z.object({
      id: z.string().uuid(),
      exerciseName: z
        .string()
        .min(1, { message: "Exercise name cannot be empty" }),
      trainingVolume: z.array(
        z.object({
          weight: z.number(),
          reps: z.number(),
          rpe: z.number().min(1).max(10),
        })
      ),
    })
  ),
});
