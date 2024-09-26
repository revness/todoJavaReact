import { TodoItemResponse } from "../../services/todo-item-services";
import { XSquare, Pencil, CheckFat, Copy } from "@phosphor-icons/react";
import { TodoFormData } from "../TodoForm/schema";
import TodoProgressBar from "../TodoProgressBar/TodoProgressBar";
interface TodoItemProps {
  todo: TodoItemResponse;
  onDelete: (id: number) => Promise<unknown>;
  onEdit: (id: number) => Promise<unknown>;
  onMarkDone: (todo: TodoItemResponse) => Promise<unknown>;
  onDuplicate: (todo: TodoFormData) => Promise<unknown>;
}

const TodoItem = ({
  todo,
  onDelete,
  onEdit,
  onMarkDone,
  onDuplicate,
}: TodoItemProps) => {
  const date = new Date(todo.createdAt);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  const formattedDate = `${day}-${month}-${year}`;

  return (
    <li
      key={todo.id}
      className={`${
        todo.completed ? "bg-gray-200/10" : "bg-white"
      } col-span-1 divide-y divide-gray-200 rounded-lg  dark:bg-black shadow dark:shadow-white border-2 `}
    >
      <TodoProgressBar createdAt={todo.createdAt} dueDate={todo.dueDate} />
      <div className="flex w-full items-center justify-between space-x-6 p-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
              {todo.title}
            </h3>
          </div>
          <p className="mt-1 truncate text-sm text-gray-500 dark:text-gray-300">
            {todo.content}{" "}
          </p>
        </div>
        <div className="flex flex-col">
          <button
            onClick={() =>
              onMarkDone({
                ...todo,
                completed: !todo.completed,
              })
            }
          >
            <CheckFat
              weight="duotone"
              className={`
          ${
            todo.completed
              ? "text-green-500 dark:text-green-400"
              : "text-gray-800 dark:text-gray-200"
          }
        `}
              size={32}
            />
          </button>
          <button onClick={() => onEdit(todo.id)}>
            <Pencil weight="duotone" className="dark:text-white" size={32} />
          </button>
          <button onClick={() => onDelete(todo.id)}>
            <XSquare weight="duotone" className="dark:text-white" size={32} />
          </button>
          <button
            onClick={() => {
              onDuplicate({
                title: todo.title + " copy",
                content: todo.content + " copy",
                category: todo.category,
                dueDate: new Date(todo.dueDate),
              });
            }}
          >
            <Copy weight="duotone" className="dark:text-white" size={32} />
          </button>
        </div>
      </div>
      <div className="">
        <div className=" px-6 py-1 ">
          <span className="text-xs font-bold dark:text-white">
            Created: {formattedDate}
          </span>
        </div>

        <div className="-mt-px flex px-6 py-1">
          <span className=" inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            {todo.category ? todo.category.name : "uncategorised"}
          </span>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
