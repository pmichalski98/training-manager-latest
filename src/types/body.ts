import { z } from "zod";

export type addMeasurementsType = z.infer<typeof addMeasurementsSchema>;
export type addWeightKcalType = z.infer<typeof addWeightKcalSchema>;

export const addMeasurementsSchema = z.object({
  neck: z.number().gte(0),
  chest: z.number().gte(0),
  waist: z.number().gte(0),
  hips: z.number().gte(0),
  thigh: z.number().gte(0),
  biceps: z.number().gte(0),
});

export const addWeightKcalSchema = z.object({
  weight: z.number().gte(0),
  kcal: z.number().gte(0),
});
