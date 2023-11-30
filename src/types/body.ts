import { z } from "zod";

export type addMeasurementsType = z.infer<typeof addMeasurementsSchema>;
export type addWeightType = z.infer<typeof addWeightSchema>;
export type addKcalType = z.infer<typeof addKcalSchema>;
export type caloricTargetType = z.infer<typeof caloricTargetSchema>;

export const addMeasurementsSchema = z.object({
  neck: z.number().gte(0),
  chest: z.number().gte(0),
  waist: z.number().gte(0),
  hips: z.number().gte(0),
  thigh: z.number().gte(0),
  biceps: z.number().gte(0),
});
export const caloricTargetSchema = z.object({
  caloricTarget: z.number(),
});
export const addWeightSchema = z.object({
  weight: z.number().multipleOf(0.1).gte(0),
});
export const addKcalSchema = z.object({
  kcal: z.number().gte(0),
});
