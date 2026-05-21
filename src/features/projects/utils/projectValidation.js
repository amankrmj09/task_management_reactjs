import { z } from "zod";

export const projectSchema = z.object({
  name: z
    .string()
    .min(2, "Project name must be at least 2 characters"),

  description: z.string().optional(),

  status: z.enum(["ACTIVE", "COMPLETED", "ON_HOLD"]),
});

export const validateProject = (data) =>
  projectSchema.safeParse(data);
