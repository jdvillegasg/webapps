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
    <div className="p-2 flex flex-col gap-y-4">
      <h1 className="text-3xl mt-12 mx-auto">Login to check your expenses</h1>
      <a
        className="text-2xl font-bold mx-auto border rounded py-2 px-3"
        href="/api/login"
      >
        Login
      </a>
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
