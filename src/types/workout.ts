import { z } from "zod";

export type Workout = z.infer<typeof addWorkoutSchema>;
export type WorkoutWithId = z.infer<typeof editWorkoutSchema>;

export const addWorkoutSchema = z.object({
  workoutName: z.string().min(1, { message: "Workout name cannot be empty" }),
  exercises: z.array(
    z.object({
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
      exerciseName: z
        .string()
        .min(1, { message: "Exercise name cannot be empty" }),
    })
  ),
});
