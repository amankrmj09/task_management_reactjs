import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(3, "Title is required"),

  description: z
    .string()
    .min(
      10,
      "Description should be at least 10 characters"
    ),

  assigneeId: z
    .string()
    .min(1, "Assignee is required"),

  priority: z.enum([
    "LOW",
    "MEDIUM",
    "HIGH",
    "CRITICAL",
  ]),

  dueDate: z.string().min(
    1,
    "Due date is required"
  ),

  tags: z.array(z.string()).optional(),
});