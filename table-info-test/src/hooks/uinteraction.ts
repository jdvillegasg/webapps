import { useEffect, useState, useContext } from "react";
import { type User } from "../types";
import { UsersContext } from "../context/users";

export function useUinteraction() {
  const { usersState, setUsersState, controls } = useContext(UsersContext);
  const [filteredState, setFilteredState] = useState<User[]>([]);

  useEffect(() => {
    const initialState = sessionStorage.getItem(
      "__initial__retrieved__users__"
    );
    if (initialState) {
      setUsersState(JSON.parse(initialState));
    }
  }, [controls.restoreinitial]);

  useEffect(() => {
    if (controls.sortbycountry) {
      sessionStorage.setItem("_last_state_", JSON.stringify(usersState));
      let newState = structuredClone(usersState);
      newState = newState.sort((a, b) => {
        if (a.location.country > b.location.country) return 1;
        if (a.location.country < b.location.country) return -1;
        return 0;
      });
      setUsersState(newState);
    } else {
      const laststate = sessionStorage.getItem("_last_state_");
      if (laststate) {
        setUsersState(JSON.parse(laststate));
      }
    }
  }, [controls.sortbycountry]);

  useEffect(() => {
    const filteredUsersState = usersState.filter((item) =>
      item.location.country
        .toLowerCase()
        .includes(controls.filteredtext.toLowerCase())
    );

    setFilteredState(filteredUsersState);
  }, [controls.filteredtext, usersState.length]);

  return { filteredState, usersState, setUsersState, controls };
}
