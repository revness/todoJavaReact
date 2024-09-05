import { TodoItemResponse } from "./todo-item-services";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

export interface CategoryResponse {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  todoItems: TodoItemResponse[];
}

export interface Category {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export const createCategory = async (data: CategoryFormData) => {
  const response = await fetch(`${baseUrl}/categories`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to post category");
  }
  return (await response.json()) as CategoryResponse;
};

export const getAllCategories = async () => {
  const response = await fetch(`${baseUrl}/categories`);
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return (await response.json()) as CategoryResponse[];
};
