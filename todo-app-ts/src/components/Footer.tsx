import { type ListOfTodos, FilterValue } from "../types";
import { Filters } from "./Filters";

interface Props {
  todos: ListOfTodos;
  onClearCompleted: () => void;
  activeCount: number;
  completedCount: number;
  filterSelected: FilterValue;
  handleFilterChange: (filter: FilterValue) => void;
}

export const Footer: React.FC<Props> = ({
  onClearCompleted,
  activeCount = 0,
  completedCount = 0,
  filterSelected,
  handleFilterChange,
}) => {
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount}</strong> tasks left
      </span>

      <Filters
        filterSelected={filterSelected}
        onFilterChange={handleFilterChange}
      />

      {completedCount > 0 && (
        <button className="clear-completed" onClick={onClearCompleted}>
          Borrar completadas
        </button>
      )}
    </footer>
  );
};
