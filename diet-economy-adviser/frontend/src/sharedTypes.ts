import { z } from "zod";
export const cityValues = [
  "Bogota",
  "Medellin",
  "Cali",
  "Barranquilla",
  "Cartagena",
  "Cucuta",
  "Bucaramanga",
  "Soacha",
  "Ibague",
  "Soledad",
  "Santa Marta",
  "Villavicencio",
  "Pereira",
  "Manizales",
  "Monteria",
  "Pasto",
  "Neiva",
  "Armenia",
  "Popayan",
  "Sincelejo",
] as const;

export const nutritionRequirementsProfilesOpts = [
  "gainWeight",
  "loseWeight",
  "custom",
] as const;
export const nutritionProfilesZodType = z.enum(
  nutritionRequirementsProfilesOpts
);
export type NutritionProfiles = z.infer<typeof nutritionProfilesZodType>;

export const cityZodType = z.enum(cityValues);
export type City = z.infer<typeof cityZodType>;
export const createFoodValidator = z.object({
  title: z
    .string()
    .min(3, { message: "Title must have at least 3 characters" }),
  carbs: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Positive numbers only" }), // Positive numbers,
  fat: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Positive numbers only" }), // Positive numbers,
  protein: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Positive numbers only" }), // Positive numbers,
  calories: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Positive numbers only" }), // Positive numbers,
  sodium: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Positive numbers only" }), // Positive numbers,
  fiber: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Positive numbers only" }), // Positive numbers,
  vitaA: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Positive numbers only" }), // Positive numbers,
  vitaC: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Positive numbers only" }), // Positive numbers,
  vitaB12: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Positive numbers only" }), // Positive numbers,
  folic: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Positive numbers only" }), // Positive numbers,
  calcium: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Positive numbers only" }), // Positive numbers,
  iron: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Positive numbers only" }), // Positive numbers,
  price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Positive numbers only" }), // Positive numbers,
  description: z
    .string()
    .min(3, { message: "Description must have at least 3 characters" })
    .max(100, { message: "Description has more than 100 characters" }),
  personalrating: z.string().refine(
    (value) => {
      const num = parseFloat(value);
      return num >= 0 && num <= 1;
    },
    {
      message: "Personal rating must be a number between 0 and 1",
    }
  ),
  potasium: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Positive numbers only" }), // Positive numbers,
  magnesium: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Positive numbers only" }), // Positive numbers,
  city: cityZodType,
  maxquantity: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Positive numbers only" }), // Positive numbers,
});

export const nutritionReqValidator = createFoodValidator
  .omit({
    city: true,
    price: true,
    personalrating: true,
    title: true,
    description: true,
    vitaA: true,
    vitaC: true,
    vitaB12: true,
    maxquantity: true,
  })
  .extend({
    profile: nutritionProfilesZodType,
    vitaa: createFoodValidator.shape.vitaA,
    vitac: createFoodValidator.shape.vitaC,
    vitab12: createFoodValidator.shape.vitaB12,
  });

export const foodTable = createFoodValidator.omit({
  city: true,
  description: true,
  personalrating: true,
  price: true,
});

export type Food = z.infer<typeof createFoodValidator>;
export type JustFood = z.infer<typeof nutritionReqValidator>;
export interface FoodPlusId extends Food {
  id: string;
}
