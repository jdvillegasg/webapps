import { Todo } from "./Todo";
import { type TodoId, type ListOfTodos } from "../types";
import { type Todo as TodoType } from "../types";

interface Props {
  todos: ListOfTodos;
  onRemoveTodo: ({ id }: TodoId) => void;
  onToggleCompleted: ({
    id,
    completed,
  }: Pick<TodoType, "id" | "completed">) => void;
}

export const Todos: React.FC<Props> = ({
  todos,
  onRemoveTodo,
  onToggleCompleted,
}) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => {
        return (
          <li key={todo.id} className={`${todo.completed ? "completed" : ""}`}>
            <Todo
              key={todo.id}
              id={todo.id}
              title={todo.title}
              completed={todo.completed}
              onRemoveTodo={onRemoveTodo}
              onToggleCompleted={onToggleCompleted}
            />
          </li>
        );
      })}
    </ul>
  );
};
