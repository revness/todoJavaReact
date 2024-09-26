import { useForm, Controller } from "react-hook-form";
import { TodoFormData, schema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryResponse } from "../../services/category-services";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type FormType = "CREATE" | "EDIT";
interface TodoFormProps {
  onSubmit: (data: TodoFormData) => unknown;
  defaultValues?: TodoFormData;
  type: FormType;
  categories?: CategoryResponse[];
}
const TodoForm = ({
  onSubmit,
  defaultValues,
  type,
  categories,
}: TodoFormProps) => {
  const {
    reset,
    register,
    control,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    setValue,
    watch,
  } = useForm<TodoFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const title = watch("title");

  const handleCategoryClick = (categoryName: string) => {
    setValue("title", `${title ? `${title} ` : ""}[${categoryName}]`, {
      shouldValidate: true,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="dark:text-black flex flex-col border-2 p-2 w-96"
    >
      <div className="p-1 ">
        <input
          id="title"
          type="text"
          {...register("title")}
          placeholder="Task Name"
          className="placeholder:text-slate-400 w-full"
        />
        {errors?.title && <small>{errors.title.message}</small>}
      </div>
      <div className="flex flex-row flex-wrap overflow-scroll h-20">
        {categories?.map((category) => (
          <div
            key={category.id}
            className="bg-green-500 rounded-md m-1 p-1 h-8 text-center"
            onClick={() => handleCategoryClick(category.name)}
          >
            {category.name}
          </div>
        ))}
      </div>
      {/* <div>
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
      </div> */}
      <div className="p-1">
        <Controller
          control={control}
          name="dueDate"
          render={({ field }) => (
            <DatePicker
              id="dueDate"
              onChange={(date) => field.onChange(date)}
              selected={field.value}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={5}
              dateFormat="yyyy-MM-dd HH:mm:ss"
              placeholderText="Due Date"
              className="placeholder:text-slate-400 w-[356px]"
            />
          )}
        />
      </div>
      <div className="p-1">
        <textarea
          {...register("content")}
          id="content"
          placeholder="Task Description"
          className="w-full resize-none h-20"
        ></textarea>
        {errors?.content && <small>{errors.content.message}</small>}
      </div>
      <div className="p-1 flex justify-center">
        <div>
          <button
            type="submit"
            className=" text-md border bg-blue-400 text-black font-medium border-black border-opacity-85 w-48 rounded-md p-1 "
          >
            {type == "EDIT" ? "Edit" : "Create"} Todo Item
          </button>
        </div>
      </div>
    </form>
  );
};

export default TodoForm;
