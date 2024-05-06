# Store

The store folder/place is where, precisely, we store our variables/state.

First we call the `configureStore` method:

!!! example "configureStore"
    ```jsx
    export const store = configureStore({
        reducer: {},
    });
    ```

Then we need to wrap our application into a Provider (as it is done with the native React Context):

!!! example "Wrap provider into app"
    ```jsx
    import { store } from "./store/index.ts";
    import { Provider } from "react-redux";

    ReactDOM.createRoot(document.getElementById("root")!).render(
        <Provider store={store}>
            <App />
        </Provider>
    );
    ```

As Redux can be used to store the state appearing in many different components, we call `slices` the partitions of the store refering to one specific source/class/category of states we want to manage.

We create a slice in our `store` folder by typing:

!!! example "Create slice"
    ```jsx
    import { createSlice } from "@reduxjs/toolkit";

    export const usersSlice = createSlice({
    name: "users",
    initialState: 0,
    reducers: {},
    });
    ```

Then we have to call the reducer from the `slice` into the store:

!!! example "Incorporate slice reducer in store"
    ```jsx
    export const store = configureStore({
    reducer: {
        users: usersSlice.reducer,
    },
    });
    ```'

To retrieve the partitioned state from the slice:

!!! example "Get state of slice"
    ```jsx
    import {useSelector} from "react-redux"
    const myconstname = useSelector(state => state.users)

In this case the attribute `users` of `state` corresponds to the name we gave in the previous step to one of the reducers.

To manage the types of the state created by Redux (when using TypeScript), we can first create a type for what can be called the `RootState` (the state comprised of all slices/partitioned states):

!!! example "Typing the root state"
    ```jsx
    export type RootState = ReturnType<typeof store.getState>
    ```

# Middleware

As the state is initialized back to its original state each time the site is refreshed, a middleware allows to persist the state.

A middleware calls a function that calls a function that calls a function:

!!! example "Structure of a middleware"
    ```jsx
    const myMiddleware = (store) => (next) => (action) => {
        ...
    }
    ```

The reason why all the callbacks are not done in the first callback, is because, due to the nature of the middleware, these subsequent callbacks are done at *different times*. 

 > More specifically, we can use a middleware to execute some code just before the state is udpated, and just after the state is udpated.