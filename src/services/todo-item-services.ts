import { TodoFormData } from "../components/TodoForm/schema";

const baseURL = import.meta.env.VITE_APP_API_BASE_URL;

export interface TodoItemResponse {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
  deleted: boolean;
  completed: boolean;
  dueDate: string;
}

export const getAllTodos = async () => {
  const response = await fetch(baseURL + "/todoitems");
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  const todos = (await response.json()) as TodoItemResponse[];
  console.log(todos, "todos");
  const activeTodos = todos.filter((todo) => !todo.deleted);

  return activeTodos;
};

export const getTodoById = async (id: number) => {
  const response = await fetch(baseURL + `/todoitems/ ${id}`, {
    method: "GET",
  });
  if (!response.ok) {
    if (response.status == 404) {
      throw new Error(await response.text());
    }
    throw new Error("Failed to get todo by ID");
  }
  return (await response.json()) as TodoItemResponse;
};

export const deleteTodoById = async (id: number) => {
  const response = await fetch(baseURL + `/todoitems/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete");
  }
  return true;
};

export const createTodo = async (data: TodoFormData) => {
  const formatDateForBackend = (date: TodoFormData["dueDate"]) => {
    if (!date) return null;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };
  console.log("data.dueDate formatted", formatDateForBackend(data.dueDate));

  const response = await fetch(baseURL + "/todoitems", {
    method: "POST",
    body: JSON.stringify({
      title: data.title,
      content: data.content,
      // categoryId: data.category.id,
      dueDate: formatDateForBackend(data.dueDate),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to post");
  }
  return (await response.json()) as TodoItemResponse;
};

//It should have a path like posts/:id/edit
// It should show an error if there is no post to edit
// It should reuse the form we already built
// But the post data should be preloaded into the form (hint: look at defaultValues)
// The button should say "Edit Post" instead of "Create Post"
// It should use the existing patch method on the API

export const editTodo = async (data: TodoFormData, id: number) => {
  const response = await fetch(baseURL + `/todoitems/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      title: data.title,
      content: data.content,
      categoryId: data.category.id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to patch");
  }
  return (await response.json()) as TodoItemResponse;
};

export const updateTodoStatus = async (todoItem: TodoItemResponse) => {
  console.log("sending update to api", todoItem);
  const response = await fetch(baseURL + `/todoitems/${todoItem.id}`, {
    method: "PATCH",
    body: JSON.stringify(todoItem),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to update todo status");
  }
  console.log("sent update to api");
  return (await response.json()) as TodoItemResponse;
};
