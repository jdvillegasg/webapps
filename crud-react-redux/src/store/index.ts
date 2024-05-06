import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./users/slice";

const persistanceLocalStorageMiddleware = (store) => (next) => (action) => {
  next(action);

  // After updating the state, persist it to the local storage
  localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
};

export const store = configureStore({
  reducer: {
    reducerforusers: usersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return [persistanceLocalStorageMiddleware];
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
