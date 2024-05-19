import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

async function getTotalSpent() {
  const result = await api.expenses["total-spent"].$get();
  if (!result.ok) {
    throw new Error("Server error");
  }
  const data = await result.json();
  return data;
}

function App() {
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

  const { isPending, error, data } = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: getTotalSpent,
  });

  //if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <Card className="w-[350px] m-auto mt-10">
        <CardHeader>
          <CardTitle>Total spent</CardTitle>
          <CardDescription>Total amount you've spent</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{isPending ? "..." : data.totalSpent}</p>
        </CardContent>
      </Card>
    </>
  );
}

export default App;
