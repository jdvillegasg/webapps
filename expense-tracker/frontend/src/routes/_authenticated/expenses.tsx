import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
import { api, getAllExpensesOpts } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/expenses")({
  component: Expenses,
});

function Expenses() {
  const queryClient = useQueryClient();
  const { isPending, data } = useQuery(getAllExpensesOpts);

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

  return (
    <Table>
      <TableCaption>A list of all your expenses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/12">ID</TableHead>
          <TableHead className="w-2/6">Title</TableHead>
          <TableHead className="w-1/6 text-right">Amount</TableHead>
          <TableHead className="w-1/6 text-right">Category</TableHead>
          <TableHead className="w-1/6 text-right">Date</TableHead>
          <TableHead className="w-1/12 text-right"></TableHead>
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
                  <TableCell>
                    <Skeleton className="h-[20px] rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-[20px] rounded-full" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-[20px] rounded-full" />
                  </TableCell>
                </TableRow>
              ))
          : data?.expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.id}</TableCell>
                <TableCell>{expense.title}</TableCell>
                <TableCell className="text-right">{expense.amount}</TableCell>
                <TableCell className="text-right">{expense.category}</TableCell>
                <TableCell className="text-right">{expense.date}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(`${expense.id}`)}
                  >
                    <Trash className="h-4 w-4"></Trash>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
}
