import { useNavigate, useParams } from "react-router-dom";
import TodoForm from "../../components/TodoForm/TodoForm";
import { editTodo, getTodoById } from "../../services/todo-item-services";
import { TodoFormData } from "../../components/TodoForm/schema";
import { useEffect, useState } from "react";
import { Rewind } from "@phosphor-icons/react";

// enum FetchStatus {
//   IDLE,
//   LOADING,
//   SUCCESS,
//   FAILURE,
// }

type FetchStatus = "IDLE" | "LOADING" | "SUCCESS" | "FAILURE";
const EditTodoItemsPage = () => {
  const [defaultValues, setDefaultValues] = useState<TodoFormData>();
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

  const onSubmit = async (data: TodoFormData) => {
    try {
      await editTodo(data, numId);
      navigate("/");
    } catch (error) {
      console.error("Failed to edit todo item:", error);
    }
  };

  //implement error handling in this page too, show error too.
  return (
    <>
      <div className="flex justify-center">
        <div>
          <button
            className="flex justify-center items-center"
            onClick={() => navigate(-1)}
          >
            <Rewind size={32} /> Go back
          </button>
          <h1 className=" text-lg  font-bold">Edit Blog Post</h1>
          {defaultValues ? (
            <TodoForm
              onSubmit={onSubmit}
              defaultValues={defaultValues}
              type="Update"
            />
          ) : (
            <p>Loading...</p>
          )}

          {fetchStatus == "FAILURE" && <h1>{error?.message}</h1>}
        </div>
      </div>
    </>
  );
};

export default EditTodoItemsPage;
