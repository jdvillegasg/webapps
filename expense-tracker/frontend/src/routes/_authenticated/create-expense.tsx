import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import { api } from "@/lib/api";
import { createExpenseSchema } from "@backend/sharedTypes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  type Category,
  categoryValues,
  categoryZodType,
} from "@backend/db/schemas/expenses";

export const Route = createFileRoute("/_authenticated/create-expense")({
  component: CreateExpense,
});

function CreateExpense() {
  // Create a useNavigate
  const navigateTo = useNavigate();

  // Copy and paste from TanStack Form Overview documentation
  const form = useForm({
    validatorAdapter: zodValidator,
    defaultValues: {
      title: "",
      amount: "",
      category: categoryZodType.Enum.Food as Category,
      date: new Date().toISOString(),
    },
    onSubmit: async ({ value }) => {
      // Do something with form data

      /* The form.Subscribe will block the button until submission
      the promise is to simulate an excesive time to submit 
      the form to the server */
      /*
      await new Promise((r) => setTimeout(r, 3000));
      */

      const resolve = await api.expenses.$post({ json: value });
      if (!resolve.ok) {
        throw new Error("Server error");
      }

      navigateTo({ to: "/expenses" });
    },
  });

  return (
    <div className="p-2 m-auto max-w-xl flex flex-col gap-y-6">
      <h1 className="text-xl">Create Expense</h1>
      <form
        className="flex flex-col gap-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="title"
          validators={{
            onChange: createExpenseSchema.shape.title,
          }}
          children={(field) => (
            <div className="flex flex-col gap-y-2">
              <Label htmlFor={field.name}>Title</Label>
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        />
        <form.Field
          name="amount"
          validators={{
            onChange: createExpenseSchema.shape.amount,
          }}
          children={(field) => (
            <div className="flex flex-col gap-y-2">
              <Label htmlFor={field.name}>Amount</Label>
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type="number"
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        />
        <form.Field
          name="category"
          validators={{
            onChange: createExpenseSchema.shape.category,
          }}
          children={(field) => (
            <div className="flex flex-col gap-y-2">
              <Label htmlFor={field.name}>Category</Label>
              <Select onValueChange={(e) => field.setValue(e as Category)}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryValues.map((entry, cnt) => {
                    return (
                      <SelectItem value={entry} key={cnt}>
                        {entry}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          )}
        />
        <form.Field
          name="date"
          validators={{
            onChange: createExpenseSchema.shape.date,
          }}
          children={(field) => (
            <div className="flex flex-col gap-y-2">
              <Label htmlFor={field.name}>Date incurred expense</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "justify-start text-center font-normal",
                      !field.state.value && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.state.value ? (
                      format(field.state.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={new Date(field.state.value)}
                    onSelect={(e) =>
                      field.handleChange((e ?? new Date()).toISOString())
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
        />
        {/* Dynamic submit button*/}
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit} className="mt-4">
              {isSubmitting ? "..." : "Create"}
            </Button>
          )}
        />
      </form>
    </div>
  );
}
