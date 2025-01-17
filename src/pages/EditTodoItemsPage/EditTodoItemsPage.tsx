import { useNavigate, useParams } from "react-router-dom";
import TodoForm from "../../components/TodoForm/TodoForm";
import { editTodo, getTodoById } from "../../services/todo-item-services";
import { TodoFormData } from "../../components/TodoForm/schema";
import { useEffect, useState } from "react";
import { Rewind } from "@phosphor-icons/react";
import { Category, getAllCategories } from "../../services/category-services";

// enum FetchStatus {
//   IDLE,
//   LOADING,
//   SUCCESS,
//   FAILURE,
// }

type FetchStatus = "IDLE" | "LOADING" | "SUCCESS" | "FAILURE";
const EditTodoItemsPage = () => {
  const [defaultValues, setDefaultValues] = useState<TodoFormData>();
  const [categoryValues, setCategoryValues] = useState<Category[]>();
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>("IDLE");
  const [error, setError] = useState<Error | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const numId = parseInt(id as string);

  useEffect(() => {
    setFetchStatus("LOADING");
    const fetchTodo = async () => {
      try {
        setFetchStatus("SUCCESS");

        const data = await getTodoById(numId);
        setDefaultValues(data);
      } catch (e) {
        setFetchStatus("FAILURE");
        setError(e as Error);

        console.error("Failed to fetch todo item:", error);
      }
    };

    fetchTodo();
  }, []);
  useEffect(() => {
    setFetchStatus("LOADING");
    const fetchCategories = async () => {
      try {
        setFetchStatus("SUCCESS");

        const categories = await getAllCategories();
        setCategoryValues(categories);
      } catch (e) {
        setFetchStatus("FAILURE");
        setError(e as Error);

        console.error("Failed to fetch todo item:", error);
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = async (data: TodoFormData) => {
    try {
      await editTodo(data, numId);
      console.log(data);
      navigate("/");
    } catch (error) {
      console.error("Failed to edit todo item:", error);
    }
  };

  //implement error handling in this page too, show error too.
  return (
    <div className="flex justify-center dark:text-white m-2">
      <div>
        <button
          className="flex justify-center items-center"
          onClick={() => navigate(-1)}
        >
          <Rewind size={32} /> Go back
        </button>
        <h1 className=" text-lg  font-bold">Edit TODO</h1>
        {defaultValues ? (
          <TodoForm
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            type="EDIT"
            categories={categoryValues}
          />
        ) : (
          <p>Loading...</p>
        )}

        {fetchStatus == "FAILURE" && <h1>{error?.message}</h1>}
      </div>
    </div>
  );
};

export default EditTodoItemsPage;
