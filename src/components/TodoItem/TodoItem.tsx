import { TodoItemResponse } from "../../services/todo-item-services";
import { XSquare, Pencil } from "@phosphor-icons/react";
import dayjs from "dayjs";
interface TodoItemProps {
  todo: TodoItemResponse;
  onDelete: (id: number) => Promise<unknown>;
  onEdit: (id: number) => Promise<unknown>;
}

const TodoItem = ({ todo, onDelete, onEdit }: TodoItemProps) => {
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
          <button onClick={() => onEdit(todo.id)}>
            <Pencil weight="duotone" size={32} />
          </button>
          <button onClick={() => onDelete(todo.id)}>
            <XSquare weight="duotone" size={32} />
          </button>
        </div>
      </div>
      <div className="">
        <div className="-mt-px flex px-6 py-2">
          <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            {todo.category}{" "}
          </span>
          <span>{todo.updatedAt} </span>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
