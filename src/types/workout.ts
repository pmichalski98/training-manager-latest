import { z } from "zod";
export type Workout = z.infer<typeof addWorkoutSchema>;

export const addWorkoutSchema = z.object({
  workoutName: z.string().min(1, { message: "Workout name cannot be empty" }),
  exerciseName: z.string().min(1, { message: "Exercise name cannot be empty" }),
});
