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
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { type FoodPlusId } from "@/sharedTypes";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/tablecolumns";

export const Route = createFileRoute("/foods")({
  component: Foods,
});

function Foods2() {
  //const queryClient = useQueryClient();
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [editingCell, setEditingCell] = useState<{
    id: string | null;
    column: string | null;
  }>({ id: null, column: null });

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

  const handleCellClick = (id: string, columnName: string) => {
    setEditingCell({ id: id, column: columnName });
  };

  const handleCellChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
    columnName: string
  ) => {
    setMaxQuantity(Number(e.target.value));
    console.log(e.target.value);
    console.log(id, columnName);
  };

  const handleBlur = () => {
    setEditingCell({ id: null, column: null });
  };

  const handleSaveChanges = () => {
    // TODO: Update the database with the new quantity
    // queryClient.setQueryData(
    //   ["get-food-by-id", editingCell.id!],
    //   (existingFood) => ({
    //    ...existingFood,
    //     [editingCell.column!]: maxQuantity,
    //   })
    // );

    const postdata = {
      id: Number(editingCell.id),
      column: "maxquantity",
      value: maxQuantity,
    };

    console.log(postdata);
    return axios
      .post("/api/update-food-by-id", postdata)
      .then(function (response) {
        //Toast
        if (response.data.message === "updated successfully") {
          toast.success(
            `Food with id ${postdata.id} was updated successfully!`
          );
        } else {
          toast("Error", { description: response.data.message });
        }

        setEditingCell({ id: null, column: null });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="p-2 flex flex-col gap-y-6">
      <h1 className="text-2xl mx-auto pt-6">Database of saved foods</h1>
      <div className="max-w-full py-3 mx-auto">
        <Table>
          <TableCaption>A list of all your foods.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">ID</TableHead>
              <TableHead className="w-[200px]">Title</TableHead>
              <TableHead className="w-[200px] text-right">Price</TableHead>
              <TableHead className="w-[200px] text-right">
                Max quantity
              </TableHead>
              <TableHead className="w-[200px] text-right"></TableHead>
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
                    </TableRow>
                  ))
              : data?.data.map((food: FoodPlusId) => (
                  <TableRow key={food.id} className="h-20">
                    <TableCell>{food.id}</TableCell>
                    <TableCell>{food.title}</TableCell>
                    <TableCell className="text-right">{food.price}</TableCell>
                    <TableCell
                      className="text-right"
                      onClick={() => handleCellClick(food.id, "maxquantity")}
                    >
                      {editingCell.id === food.id &&
                      editingCell.column === "maxquantity" ? (
                        <Input
                          type="number"
                          onChange={(e) =>
                            handleCellChange(e, food.id, "maxquantity")
                          }
                          onBlur={handleBlur}
                          autoFocus
                          className="w-1/2 text-center float-right"
                        />
                      ) : (
                        food.maxquantity
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        onClick={() => {
                          handleSaveChanges();
                        }}
                      >
                        Save changes
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function Foods() {
  const { isPending, data } = useQuery({
    queryKey: ["get-all-foods"],
    queryFn: async () => {
      try {
        const result = await axios.get("/api/foods");
        const data = result.data;

        return data;
      } catch (err) {
        console.error(err);
        throw new Error("Error fetching foods");
      }
    },
  });

  return (
    <div className="container mx-auto py-10">
      {isPending ? (
        <h1 className="text-center text-xl mx-auto">Pending</h1>
      ) : (
        <DataTable columns={columns} data={data.data} />
      )}
    </div>
  );
}
