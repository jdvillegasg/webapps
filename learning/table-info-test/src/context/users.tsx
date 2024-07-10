import { createContext } from "react";
import { useState } from "react";
import { useData } from "../hooks/users";
import { type UsersContextValue, type Controls } from "../types";

export const UsersContext = createContext<UsersContextValue>(null!);

export function UsersProvider({ children }) {
  const { usersState, setUsersState } = useData();

  const [controls, setControls] = useState<Controls>({
    rowcolor: false,
    sortbycountry: false,
    restoreinitial: false,
    filteredtext: "",
  });

  return (
    <UsersContext.Provider
      value={{ usersState, setUsersState, controls, setControls }}
    >
      {children}
    </UsersContext.Provider>
  );
}
