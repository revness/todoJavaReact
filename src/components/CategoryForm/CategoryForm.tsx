// import { CategoryResponse } from "../../services/category-services";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryFormData, schema } from "./schema";
import { useForm } from "react-hook-form";

interface CategoryFormProps {
  //   onSubmit: (data: CategoryFormData) => Promise<CategoryResponse>;
  onSubmit: (data: CategoryFormData) => unknown;
}

const CategoryForm = ({ onSubmit }: CategoryFormProps) => {
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm<CategoryFormData>({ resolver: zodResolver(schema) });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Category name</label>
        <input type="text" {...register("name")} />
      </div>
      <button type="submit">Add Category</button>
    </form>
  );
};

export default CategoryForm;
