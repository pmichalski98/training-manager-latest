import { z } from "zod";

export const addWorkoutSchema = z.object({
  workoutName: z.string(),
  exerciseName: z.string(),
});
