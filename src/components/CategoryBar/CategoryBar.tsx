import CategoryForm from "../CategoryForm/CategoryForm";
import { CategoryFormData } from "../TodoForm/schema";

const CategoryBar = () => {
  const handleOnSubmit = (data: CategoryFormData) => {
    console.log(data);
  };

  return (
    <div>
      <CategoryForm onSubmit={handleOnSubmit} />
    </div>
  );
};

export default CategoryBar;
