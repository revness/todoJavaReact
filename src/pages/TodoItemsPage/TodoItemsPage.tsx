import { useState, useEffect } from "react";
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
const TodoItemsPage = () => {
  const navigate = useNavigate();

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
  const onDelete = async (id: number) => {
    // const confirmed = confirm('Are you sure?');
    // if (!confirmed) {
    //   return;
    // }
    const isDeleted = await deleteTodoById(id).catch((e) => {
      console.log(e);
      return false;
    });
    if (isDeleted) {
      const updatedPosts = todos.filter((todo) => todo.id !== id);
      setTodos(updatedPosts);
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
    }
  };

  const onEdit = async (id: number) => {
    navigate(`/todos/${id}/edit`);
  };
  const onDuplicate = async (todo: TodoFormData) => {
    try {
      const newTodo = await createTodo(todo);
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (error) {
      console.error("Error duplicating todo:", error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {todos.map((todo) => (
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
  );
};

export default TodoItemsPage;
