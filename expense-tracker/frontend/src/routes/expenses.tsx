import { createFileRoute } from "@tanstack/react-router";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/expenses")({
  component: Expenses,
});

const getAllExpenses = async () => {
  //await new Promise((resolve) => setTimeout(resolve, 3000));
  const result = await api.expenses.$get();
  if (!result.ok) throw new Error("Expense not found");
  const data = await result.json();
  return data;
};

function Expenses() {
  const { isPending, data } = useQuery({
    queryKey: ["get-all-expenses"],
    queryFn: getAllExpenses,
  });

  return (
    <div className="p-2 m-auto max-w-3xl">
      <Table>
        <TableCaption>A list of all your expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3">ID</TableHead>
            <TableHead className="w-1/3">Title</TableHead>
            <TableHead className="w-1/3 text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending
            ? Array(3)
                .fill(0)
                .map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">
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
                  <TableCell className="font-medium">{expense.id}</TableCell>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell className="text-right">{expense.amount}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
