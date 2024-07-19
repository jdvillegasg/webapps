import { createFileRoute } from "@tanstack/react-router";
import {
  CardAll,
  CardLastWeek,
  CardLastBiWeek,
  CardAnyInterval,
  CardLastMonth,
} from "@/components/Dashboard";

import { Graphs } from "@/components/Graphs";

export const Route = createFileRoute("/_authenticated/")({
  component: Index,
});

function Index() {
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
      <h1 className="text-center text-4xl mx-auto mt-6">Dashboard</h1>
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
