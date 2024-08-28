import { useState, useEffect } from "react";
import {
  getAllTodos,
  TodoItemResponse,
  deleteTodoById,
} from "../../services/todo-item-services";
import TodoItem from "../../components/TodoItem/TodoItem";
import { useNavigate } from "react-router-dom";
const TodoItemsPage = () => {
  const navigate = useNavigate();

  const [todos, setTodos] = useState<TodoItemResponse[]>([]);
  useEffect(() => {
    getAllTodos()
      .then((data) => setTodos(data))
      .catch((e) => console.log(e));
  }, []);

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

  const onEdit = async (id: number) => {
    navigate(`/todos/${id}/edit`);
  };
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default TodoItemsPage;
