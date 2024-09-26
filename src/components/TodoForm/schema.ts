import * as z from "zod";

export const CategorySchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
});
export const schema = z.object({
  title: z.string().min(5),
  content: z.string().min(1),
  category: CategorySchema.optional(),
  dueDate: z.date().nullable().optional(),
});
export type TodoFormData = z.infer<typeof schema>;

const CreateCategorySchema = z.object({
  name: z.string().min(1),
});

export type CategoryFormData = z.infer<typeof CreateCategorySchema>;
