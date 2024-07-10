import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { UsersProvider } from "./context/users.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <UsersProvider>
    <App />
  </UsersProvider>
);
