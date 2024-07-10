import { TableDisplay } from "./components/TableDisplay";
import { Controls } from "./components/Controls";

function App() {
  return (
    <div className="flex flex-col gap-y-6 max-w-screen-xl bg-slate-100 mx-auto">
      <h1 className="text-5xl mx-auto">Users list</h1>
      <Controls></Controls>
      <TableDisplay></TableDisplay>
    </div>
  );
}

export default App;
