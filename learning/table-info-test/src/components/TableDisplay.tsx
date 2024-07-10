import {
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";

import { type User } from "../types";
import { useUinteraction } from "../hooks/uinteraction";

export function TableDisplay() {
  const { usersState, setUsersState, filteredState, controls } =
    useUinteraction();

  const handleRemoveUser = (id: string) => {
    setUsersState((state) => {
      return state.filter((user) => user.cell !== id);
    });
  };

  const handleClickToSort = (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget.innerText === "Name") {
      let newState = structuredClone(usersState);
      newState = newState.sort((a, b) => {
        if (a.name.first > b.name.first) return 1;
        if (a.name.first < b.name.first) return -1;
        return 0;
      });
      setUsersState(newState);
    } else if (e.currentTarget.innerText === "Lastname") {
      let newState = structuredClone(usersState);
      newState = newState.sort((a, b) => {
        if (a.name.last > b.name.last) return 1;
        if (a.name.last < b.name.last) return -1;
        return 0;
      });
      setUsersState(newState);
    } else if (e.currentTarget.innerText === "Country") {
      let newState = structuredClone(usersState);
      newState = newState.sort((a, b) => {
        if (a.location.country > b.location.country) return 1;
        if (a.location.country < b.location.country) return -1;
        return 0;
      });
      setUsersState(newState);
    }
  };

  return (
    <Card>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Photo</TableHeaderCell>
            <TableHeaderCell
              onClick={(e) => handleClickToSort(e)}
              className="hover:cursor-pointer"
            >
              Name
            </TableHeaderCell>
            <TableHeaderCell
              onClick={(e) => handleClickToSort(e)}
              className="hover:cursor-pointer"
            >
              Lastname
            </TableHeaderCell>
            <TableHeaderCell
              onClick={(e) => handleClickToSort(e)}
              className="hover:cursor-pointer"
            >
              Country
            </TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {controls.filteredtext.length > 0
            ? filteredState.map((item: User) => (
                <TableRow key={item.email}>
                  <TableCell>
                    <img src={item.picture.medium} alt={item.name.first} />
                  </TableCell>
                  <TableCell>{item.name.first}</TableCell>
                  <TableCell>{item.name.last}</TableCell>
                  <TableCell>{item.location.country}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleRemoveUser(item.cell)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            : usersState.map((item: User) => (
                <TableRow key={item.email}>
                  <TableCell>
                    <img src={item.picture.medium} alt={item.name.first} />
                  </TableCell>
                  <TableCell>{item.name.first}</TableCell>
                  <TableCell>{item.name.last}</TableCell>
                  <TableCell>{item.location.country}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleRemoveUser(item.cell)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </Card>
  );
}
