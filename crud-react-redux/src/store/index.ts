import { configureStore, type Middleware } from "@reduxjs/toolkit";
import { UserWithId, usersSlice, rollbackUser } from "./users/slice";
import { toast } from "sonner";

const persistanceLocalStorageMiddleware: Middleware =
  (store) => (next) => (action) => {
    next(action);

    // After updating the state, persist it to the local storage
    localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
  };

const syncWithDatabase: Middleware = (store) => (next) => (action) => {
  const { type, payload } = action;
  const previousState = store.getState();
  next(action);

  if (type === "users/deleteUserById") {
    const userIdToRemove = payload;
    const userToRemove = previousState.reducerforusers.find(
      (user: UserWithId) => user.id === userIdToRemove
    );

    // HERE SHOULD GO THE CODE TO INTEGRATE WITH THE DATABASE
    // use a fake URL to check the catch part of the code
    // or throw an error in the `then`
    fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok)
          toast.success(`User ${userIdToRemove} deleted successfully`);
        else {
          throw new Error("Error when deleting user" + response.status);
        }
      })
      .catch((error) => {
        toast.error(`Error deleting user ${userIdToRemove}`);
        if (userToRemove) store.dispatch(rollbackUser(userToRemove));
        console.log(error);
      });
  }
};

export const store = configureStore({
  reducer: {
    reducerforusers: usersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([
      persistanceLocalStorageMiddleware,
      syncWithDatabase,
    ]);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
