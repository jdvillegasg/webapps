import { createFileRoute } from "@tanstack/react-router";
import {
  CardLastWeek,
  CardLastBiWeek,
  CardAnyInterval,
  CardLastMonth,
} from "@/components/Dashboard";
import { userQueryOpts } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Graphs } from "@/components/Graphs";

export const Route = createFileRoute("/_authenticated/")({
  component: Index,
});

function Index() {
  const { error, isPending, data } = useQuery(userQueryOpts);

  if (isPending) return "loading";
  if (error) return "Error: not logged in";

  /* Alternatively, instead of using Tanstack we can use an useEffect:
  const [totalSpent, setTotalSpent] = useState(0);
  useEffect(() => {
    async function fetchTotalSpent() {
      try {
        //const res = await fetch("api/expenses/total-spent");
        const res = await api.expenses["total-spent"].$get();
        const data = await res.json();
        setTotalSpent(data.totalSpent);
      } catch (err) {
        console.error(err);
      }
    }
    fetchTotalSpent();
  }, []);
  */

  return (
    <>
      <div className="p-2 flex flex-col">
        <h1 className="text-4xl mt-6">
          Welcome {data.user.given_name} {data.user.family_name}
        </h1>
        <span className="text-2xl mt-2">
          Below you will find a summary of your expenses
        </span>
      </div>
      {/*<h1 className="text-center text-4xl mx-auto mt-6">Dashboard</h1>*/}
      <div className="flex flex-row justify-between gap-x-6 mt-10">
        <div className="w-1/2">
          <CardAnyInterval></CardAnyInterval>
        </div>
        <div className="flex flex-col gap-y-3 w-1/2">
          {/*<CardAll></CardAll>*/}
          <CardLastWeek></CardLastWeek>
          <CardLastBiWeek></CardLastBiWeek>
          <CardLastMonth></CardLastMonth>
        </div>
      </div>
      <Graphs></Graphs>
    </>
  );
}
