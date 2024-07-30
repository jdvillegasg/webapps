import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Toaster } from "@/components/ui/sonner";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex flex-row justify-center mx-auto gap-x-16">
        <Link to="/" className="[&.active]:font-bold text-xl">
          Home
        </Link>{" "}
        <Link to="/create_food" className="[&.active]:font-bold text-xl">
          Create food
        </Link>{" "}
        <Link to="/foods" className="[&.active]:font-bold text-xl">
          Foods
        </Link>
      </div>
      <hr />
      <Outlet />
      <Toaster />
      <TanStackRouterDevtools />
    </>
  ),
});
