import { useContext } from "react";
import { UsersContext } from "../context/users";
import { type Controls } from "../types";

export function Controls() {
  const { controls, setControls } = useContext(UsersContext);

  const handleColorRows = () => {
    const getrowcolorflag = controls.rowcolor;
    setControls((state) => ({
      ...state,
      rowcolor: !getrowcolorflag,
    }));
  };

  const handleSorting = () => {
    const getsortflag = controls.sortbycountry;
    setControls((state) => ({
      ...state,
      sortbycountry: !getsortflag,
    }));
  };

  const handleRestore = () => {
    const getrestoreflag = controls.restoreinitial;
    setControls((state) => ({
      ...state,
      restoreinitial: !getrestoreflag,
    }));
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setControls((state) => ({
      ...state,
      filteredtext: e.currentTarget.value,
    }));
  };

  return (
    <div className="flex flex-row gap-x-3 mx-auto">
      <button
        className="rounded border px-4 py-1 text-center"
        onClick={handleColorRows}
      >
        Color rows
      </button>
      <button
        className="rounded border px-4 py-1 text-center"
        onClick={handleSorting}
      >
        Sort by country
      </button>
      <button
        className="rounded border px-4 py-1 text-center"
        onClick={handleRestore}
      >
        Restore initial state
      </button>
      <input
        type="text"
        placeholder="Filter by country"
        className="rounded border px-2 py-1 text-center"
        value={controls.filteredtext}
        onChange={(e) => handleChangeText(e)}
      ></input>
    </div>
  );
}
