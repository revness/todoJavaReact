import { useNavigate } from "react-router-dom";
import TodoForm from "../../components/TodoForm/TodoForm";
import { createTodo } from "../../services/todo-item-services";
import { TodoFormData } from "../../components/TodoForm/schema";
import { Rewind } from "@phosphor-icons/react";
const CreateTodoItemsPage = () => {
  const navigate = useNavigate();
  const onSubmit = async (data: TodoFormData) => {
    createTodo(data)
      .then(() => navigate("/"))
      .catch((e) => console.log(e));
  };
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
          <h1 className=" text-lg  font-bold">Create a Blog Post</h1>
          <TodoForm onSubmit={onSubmit} type="CREATE" />
        </div>
      </div>
    </>
  );
};

export default CreateTodoItemsPage;
