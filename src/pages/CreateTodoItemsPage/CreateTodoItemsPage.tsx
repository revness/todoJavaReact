import { useNavigate } from "react-router-dom";
import TodoForm from "../../components/TodoForm/TodoForm";
import { createTodo } from "../../services/todo-item-services";
import { TodoFormData } from "../../components/TodoForm/schema";
import { Rewind } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import {
  CategoryResponse,
  getAllCategories,
} from "../../services/category-services";
const CreateTodoItemsPage = () => {
  const [categoryValues, setCategoryValues] = useState<CategoryResponse[]>();

  const navigate = useNavigate();
  const onSubmit = async (data: TodoFormData) => {
    createTodo(data)
      .then(() => navigate("/"))
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getAllCategories();
        setCategoryValues(categories);
      } catch (e) {
        console.error("Failed to fetch todo item:", e);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex justify-center dark:text-white m-2">
      <div className="">
        <button
          className="flex justify-center items-center"
          onClick={() => navigate(-1)}
        >
          <Rewind size={32} /> Go back
        </button>
        <h1 className=" text-lg  font-bold text-center">Create a TODO</h1>
        <TodoForm
          onSubmit={onSubmit}
          categories={categoryValues}
          type="CREATE"
        />
      </div>
    </div>
  );
};

export default CreateTodoItemsPage;
