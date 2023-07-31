import { z } from "zod";
import { addWorkoutSchema } from "~/schemas/add-workout";

export type Workout = z.infer<typeof addWorkoutSchema>;
