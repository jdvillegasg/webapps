import { type QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
//import { TanStackRouterDevtools } from "@tanstack/router-devtools";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
});

function NavigationBar() {
  return (
    <div className="flex p-2 max-w-3xl m-auto justify-between">
      <Link to="/" className="[&.active]:font-bold">
        <h1 className="text-2xl">Expense Tracker</h1>
      </Link>
      <div className="flex flex-row gap-x-4 my-auto">
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        <Link to="/expenses" className="[&.active]:font-bold">
          Expenses
        </Link>
        <Link to="/create-expense" className="[&.active]:font-bold">
          Create
        </Link>
        <Link to="/profile" className="[&.active]:font-bold">
          Profile
        </Link>
      </div>
    </div>
  );
}

function Root() {
  return (
    <>
      <NavigationBar></NavigationBar>
      <hr />
      <div className="p-2 max-w-3xl mx-auto">
        <Outlet />
      </div>
      <Toaster></Toaster>
      {/*<TanStackRouterDevtools />*/}
    </>
  );
}
