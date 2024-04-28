import { useState } from "react";
import { Todos } from "./components/Todos";
import { TodoTitle, type TodoId, type Todo as TodoType } from "./types";
import { TODO_FILTERS } from "./consts";
import { FilterValue } from "./types";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

const mockTodos = [
  {
    id: "1",
    title: "Ver el Twitch de Midudev",
    completed: true,
  },
  {
    id: "2",
    title: "Aprender React con TypeScript",
    completed: false,
  },
  {
    id: "3",
    title: "Completar curso de Node de Midudev",
    completed: false,
  },
];

const App = (): JSX.Element => {
  const [todos, setTodos] = useState(mockTodos);
  const [filterSelected, setFilterSelected] = useState<FilterValue>(
    TODO_FILTERS.ALL
  );

  const handleRemove = ({ id }: TodoId) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleCompleted = ({
    id,
    completed,
  }: Pick<TodoType, "id" | "completed">) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed,
        };
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleFilterChange = (filter: FilterValue) => {
    setFilterSelected(filter);
  };

  const handleRemoveAllCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - activeCount;
  const todosFiltered = todos.filter((todo) => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed;
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed;
    return todo;
  });

  const handleAddTodo = ({ title }: TodoTitle) => {
    const newTodo = {
      id: crypto.randomUUID().toString(),
      title: title,
      completed: false,
    };

    setTodos((prevState) => [...prevState, newTodo]);
  };

  return (
    <div className="todoapp">
      <Header onAddTodo={handleAddTodo}></Header>
      <Todos
        todos={todosFiltered}
        onRemoveTodo={handleRemove}
        onToggleCompleted={handleCompleted}
      ></Todos>
      <Footer
        filterSelected={filterSelected}
        todos={mockTodos}
        onClearCompleted={handleRemoveAllCompleted}
        activeCount={activeCount}
        completedCount={completedCount}
        handleFilterChange={handleFilterChange}
      ></Footer>
    </div>
  );
};

export default App;
