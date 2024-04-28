# Install packages

The styles that will be used for the web app can be installed by running:

```sh
npm install todomvc-app-css
```

# Logic progress

First create the functionality to remove an item, and use prop drilling to pass the function to the `Todos` component and then to the `Todo` component:

```tsx
// App.tsx
//...
    const newTodos = todos.filter((todo) => {
      todo.id !== id;
    });
    setTodos(newTodos);
  };
//...
```
