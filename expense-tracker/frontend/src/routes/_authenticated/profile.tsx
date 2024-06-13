import { createFileRoute } from "@tanstack/react-router";
import { userQueryOpts } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile,
});

function Profile() {
  const { error, isPending, data } = useQuery(userQueryOpts);

  if (isPending) return "loading";
  if (error) return "Error: not logged in";

  return (
    <div className="p-2 flex flex-col">
      <h1>Welcome {data.user.family_name}</h1>
      <a href="/api/logout">Logout</a>
    </div>
  );
}
