import { useState, useEffect } from "react";
import { type User } from "../types";

export function useData() {
  const [usersState, setUsersState] = useState<User[]>([]);

  const getData = async (nout: number) => {
    const API_URL = `https://randomuser.me/api/?results=${nout}`;

    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setUsersState(data.results);
      sessionStorage.setItem(
        "__initial__retrieved__users__",
        JSON.stringify(data.results)
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData(100);
  }, []);

  return { usersState, setUsersState };
}
