import { useForm } from "react-hook-form";
import { TodoFormData, schema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";

type FormType = "CREATE" | "EDIT";
interface TodoFormProps {
  onSubmit: (data: TodoFormData) => unknown;
  defaultValues?: TodoFormData;
  type: FormType;
}
const TodoForm = ({ onSubmit, defaultValues, type }: TodoFormProps) => {
  const {
    reset,
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm<TodoFormData>({
    resolver: zodResolver(schema),
    // defaultValues: defaultValues,
    defaultValues,
  });

  isSubmitSuccessful && reset();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" {...register("title")} />
        {errors?.title && <small>{errors.title.message}</small>}
      </div>

      <div>
        <label htmlFor="category">Category</label>
        <input id="category" type="text" {...register("category")} />
        {errors?.category && <small>{errors.category.message}</small>}
      </div>

      <div>
        <label htmlFor="content">Content</label>
        <textarea {...register("content")} id="content"></textarea>
        {errors?.content && <small>{errors.content.message}</small>}
      </div>
      <button className=" text-md border border-black border-opacity-85">
        {type} Todo Item
      </button>
    </form>
  );
};

export default TodoForm;
