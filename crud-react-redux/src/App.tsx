import "./App.css";
import { UsersList } from "./components/UsersList";
import { CreateNewUser } from "./components/CreateNewUser";

function App() {
  return (
    <>
      <UsersList></UsersList>
      <CreateNewUser></CreateNewUser>
    </>
  );
}

export default App;
