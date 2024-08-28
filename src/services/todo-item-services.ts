import { TodoFormData } from "../components/TodoForm/schema";

const baseURL = import.meta.env.VITE_APP_API_BASE_URL;


export interface TodoItemResponse {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    category: string;
  }

export const getAllTodos = async () => {
    const response = await fetch(baseURL + '/todos');
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    return (await response.json()) as TodoItemResponse[];
  };

  export const getTodoById = async (id: number) => {
    const response = await fetch(baseURL + `/todos/ ${id}`, {
      method: 'GET',
    });
    if (!response.ok) {
        if (response.status == 404){
            throw new Error(await response.text())
        }
       throw new Error('Failed to get todo by ID');
    }
    return (await response.json()) as TodoItemResponse;
  };

  export const deleteTodoById = async (id: number) => {
    const response = await fetch(baseURL + `/todos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete');
    }
    return true;
  };

 
  export const createTodo = async (data: TodoFormData) => {
    const response = await fetch(baseURL + '/todos', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to post');
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
    const response = await fetch(baseURL + `/todos/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to patch');
      }
      return (await response.json()) as TodoItemResponse;
}