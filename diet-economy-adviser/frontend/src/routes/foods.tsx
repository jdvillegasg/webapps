import { createFileRoute } from "@tanstack/react-router";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { type FoodPlusId } from "@/sharedTypes";

export const Route = createFileRoute("/foods")({
  component: Foods,
});

function Foods() {
  //const queryClient = useQueryClient();
  const { isPending, data } = useQuery({
    queryKey: ["get-all-foods"],
    queryFn: async () => {
      try {
        const result = await axios.get("/api/foods");
        const data = result.data;
        console.log(data);

        return data;
      } catch (err) {
        console.error(err);
        throw new Error("Error fetching foods");
      }
    },
  });

  /*
  const handleDelete = async (id: string) => {
    const res = await api.expenses[":id{[0-9]+}"].$delete({
      param: { id: id },
    });

    if (!res.ok) {
      toast("Error", {
        description: `Expense ${id} could not be deleted`,
      });
      throw new Error("Could not delete expense");
    }

    //If success show a toast and update the expense table
    toast("Expense deleted", {
      description: `Expense ${id} was deleted`,
    });

    queryClient.setQueryData(
      getAllExpensesOpts.queryKey,
      (existingExpenses) => ({
        ...existingExpenses,
        expenses: existingExpenses!.expenses.filter(
          (exp) => exp.id.toString() !== id
        ),
      })
    );
  };
  */
  return (
    <div className="p-2 flex flex-col gap-y-6">
      <h1 className="text-2xl mx-auto pt-6">Welcome to Foods!</h1>
      <div className="max-w-full py-3 mx-auto">
        <Table>
          <TableCaption>A list of all your foods.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/3">ID</TableHead>
              <TableHead className="w-1/3">Title</TableHead>
              <TableHead className="w-1/3 text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending
              ? Array(2)
                  .fill(0)
                  .map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-[20px] rounded-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-[20px] rounded-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-[20px] rounded-full" />
                      </TableCell>
                    </TableRow>
                  ))
              : data?.data.map((food: FoodPlusId) => (
                  <TableRow key={food.id}>
                    <TableCell>{food.id}</TableCell>
                    <TableCell>{food.title}</TableCell>
                    <TableCell className="text-right">{food.price}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
