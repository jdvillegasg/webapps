import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import { api } from "@/lib/api";

export const Route = createFileRoute("/_authenticated/create-expense")({
  component: CreateExpense,
});

function CreateExpense() {
  // Create a useNavigatefff
  const navigateTo = useNavigate();

  // Copy and paste from TanStack Form Overview documentation
  const form = useForm({
    defaultValues: {
      title: "",
      amount: 0,
    },
    onSubmit: async ({ value }) => {
      // Do something with form data

      /* The form.Subscribe will block the button until submission
      the promise is to simulate an excesive time to submit 
      the form to the server*/
      await new Promise((r) => setTimeout(r, 3000));

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
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="title"
          children={(field) => (
            <>
              <Label htmlFor={field.name}>Title</Label>
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </>
          )}
        />
        <form.Field
          name="amount"
          children={(field) => (
            <>
              <Label htmlFor={field.name}>Amount</Label>
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type="number"
                onChange={(e) => field.handleChange(e.target.valueAsNumber)}
              />
            </>
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
