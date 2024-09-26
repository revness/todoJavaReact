import { useState, useEffect, useMemo } from "react";
import {
  getAllTodos,
  TodoItemResponse,
  deleteTodoById,
  updateTodoStatus,
  createTodo,
} from "../../services/todo-item-services";
import TodoItem from "../../components/TodoItem/TodoItem";
import { useNavigate } from "react-router-dom";
import { TodoFormData } from "../../components/TodoForm/schema";
import Toast from "../../components/Toast/Toast";

type FilterType = "all" | "completed" | "toComplete";
type ToastType = {
  message: string;
  type: "success" | "error";
} | null;

//filter functions
const filterCompleted = (todos: TodoItemResponse[]) => {
  return todos.filter((todo) => todo.completed);
};
const filterToComplete = (todos: TodoItemResponse[]) => {
  return todos.filter((todo) => !todo.completed);
};

const TodoItemsPage = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState<ToastType>(null);
  const [currentFilter, setCurrentFilter] = useState<FilterType>("all");
  const [todos, setTodos] = useState<TodoItemResponse[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);
  const fetchTodos = async () => {
    try {
      const data = await getAllTodos();
      setTodos(data);
    } catch (error) {
      console.log("Error fetching todos:", error);
    }
  };

  const filteredTodos = useMemo(() => {
    switch (currentFilter) {
      case "completed":
        return filterCompleted(todos);
      case "toComplete":
        return filterToComplete(todos);
      default:
        return todos;
    }
  }, [todos, currentFilter]);

  const handleFilterChange = (filter: FilterType) => {
    setCurrentFilter(filter);
  };

  const onDelete = async (id: number) => {
    const isDeleted = await deleteTodoById(id).catch((e) => {
      console.log(e);
      setToast({ message: "Error deleting todo", type: "error" });
      return false;
    });
    if (isDeleted) {
      const updatedPosts = todos.filter((todo) => todo.id !== id);
      setTodos(updatedPosts);
      setToast({ message: "Todo deleted successfully!", type: "success" });
    }
  };

  const onMarkDone = async (todoItem: TodoItemResponse) => {
    try {
      const updatedTodo = await updateTodoStatus(todoItem);
      setTodos(
        todos.map((todo) =>
          todo.id === todoItem.id
            ? { ...todo, completed: updatedTodo.completed }
            : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo status:", error);
      setToast({ message: "Error updating todo!", type: "error" });
    }
  };

  const onEdit = async (id: number) => {
    navigate(`/todos/${id}/edit`);
  };
  const onDuplicate = async (todo: TodoFormData) => {
    try {
      const newTodo = await createTodo(todo);
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setToast({ message: "Todo duplicated successfully!", type: "success" });
    } catch (error) {
      console.error("Error duplicating todo:", error);
      setToast({ message: "Error duplicating todo!", type: "error" });
    }
  };

  return (
    <div className="mt-4">
      <div className="flex justify-center gap-2 m-2">
        <button
          className={`${
            currentFilter == "toComplete" ? "bg-blue-300" : "bg-white"
          } border-2 hover:bg-blue-300 rounded-md border-gray-400 p-2 dark:invert`}
          onClick={() => {
            handleFilterChange("toComplete");
          }}
        >
          To Complete
        </button>
        <button
          className={`${
            currentFilter == "completed" ? "bg-blue-300" : "bg-white"
          } border-2 hover:bg-blue-300 rounded-md border-gray-400 p-2 dark:invert`}
          onClick={() => {
            handleFilterChange("completed");
          }}
        >
          Completed Tasks
        </button>
        <button
          className={`${
            currentFilter == "all" ? "bg-blue-300" : "bg-white"
          } border-2 hover:bg-blue-300 rounded-md border-gray-400 p-2 dark:invert`}
          onClick={() => {
            handleFilterChange("all");
          }}
        >
          All Tasks
        </button>
      </div>
      {filteredTodos.length == 0 && (
        <div className="flex justify-center dark:invert">
          Theres nothing here...
        </div>
      )}
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEdit={onEdit}
            onDelete={onDelete}
            onMarkDone={onMarkDone}
            onDuplicate={onDuplicate}
          />
        ))}
      </ul>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default TodoItemsPage;
