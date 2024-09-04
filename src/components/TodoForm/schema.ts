import * as z from "zod";

const CategorySchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
});
export const schema = z.object({
  title: z.string().min(5),
  content: z.string().min(1),
  category: CategorySchema,
});
export type TodoFormData = z.infer<typeof schema>;
