import { createFileRoute, Outlet } from "@tanstack/react-router";
import { userQueryOpts } from "@/lib/api";

// src/routes/_authenticated.tsx
export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;

    try {
      const data = await queryClient.fetchQuery(userQueryOpts);
      return data;
    } catch (error) {
      return { user: null };
    }
  },
  component: Authenticated,
});

function Login() {
  return (
    <div className="p-2 flex flex-col">
      <h1>You have to login</h1>
      <a href="/api/login">Login</a>
    </div>
  );
}

function Authenticated() {
  const { user } = Route.useRouteContext();
  if (!user) {
    return <Login />;
  }

  return <Outlet />;
}
