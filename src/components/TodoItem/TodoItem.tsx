import { TodoItemResponse } from "../../services/todo-item-services";
import { XSquare, Pencil, CheckFat, Copy } from "@phosphor-icons/react";
import { TodoFormData } from "../TodoForm/schema";
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
      className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
    >
      <div className="flex w-full items-center justify-between space-x-6 p-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="truncate text-sm font-medium text-gray-900">
              {todo.title}
            </h3>
          </div>
          <p className="mt-1 truncate text-sm text-gray-500">{todo.content} </p>
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
              color={todo.completed ? "green" : "red"}
              size={32}
            />
          </button>
          <button onClick={() => onEdit(todo.id)}>
            <Pencil weight="duotone" size={32} />
          </button>
          <button onClick={() => onDelete(todo.id)}>
            <XSquare weight="duotone" size={32} />
          </button>
          <button
            onClick={() => {
              onDuplicate({
                title: todo.title,
                content: todo.content,
                category: todo.category,
              });
            }}
          >
            <Copy weight="duotone" size={32} />
          </button>
        </div>
      </div>
      <div className="">
        <div className=" px-6 py-1 ">
          <span className="text-xs font-bold">Created: {formattedDate} </span>
        </div>

        <div className="-mt-px flex px-6 py-1">
          <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            {todo.category.name}
          </span>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
