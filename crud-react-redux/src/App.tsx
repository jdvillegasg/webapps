import "./App.css";
import { UsersList } from "./components/UsersList";
import { CreateNewUser } from "./components/CreateNewUser";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <UsersList></UsersList>
      <CreateNewUser></CreateNewUser>
      <Toaster richColors />
    </>
  );
}

export default App;
