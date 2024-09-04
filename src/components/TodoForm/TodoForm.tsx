import { useForm, Controller } from "react-hook-form";
import { TodoFormData, schema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "../../services/category-services";
import { useEffect } from "react";

type FormType = "CREATE" | "EDIT";
interface TodoFormProps {
  onSubmit: (data: TodoFormData) => unknown;
  defaultValues?: TodoFormData;
  type: FormType;
  categories?: Category[];
}
const TodoForm = ({
  onSubmit,
  defaultValues,
  type,
  categories = [],
}: TodoFormProps) => {
  const {
    reset,
    register,
    control,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm<TodoFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" {...register("title")} />
        {errors?.title && <small>{errors.title.message}</small>}
      </div>
      <div>
        <label htmlFor="category">Category</label>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <select
              id="category"
              value={field.value?.id?.toString() || ""}
              onChange={(e) => {
                const selectedId = parseInt(e.target.value, 10);
                const selectedCategory = categories.find(
                  (c) => c.id === selectedId
                );
                field.onChange(selectedCategory || null);
              }}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          )}
        />
        {errors?.category && <small>{errors.category.message}</small>}
      </div>

      <div>
        <label htmlFor="content">Content</label>
        <textarea {...register("content")} id="content"></textarea>
        {errors?.content && <small>{errors.content.message}</small>}
      </div>
      <button
        type="submit"
        className=" text-md border border-black border-opacity-85"
      >
        {type == "EDIT" ? "Edit" : "Create"} Todo Item
      </button>
    </form>
  );
};

export default TodoForm;
