import { useForm } from "@tanstack/react-form";
import { Input } from "./ui/input.tsx";
import { Label } from "./ui/label.tsx";
import { Button } from "./ui/button.tsx";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { type CustomChangeEvent, fundingSchema } from "../types.ts";
import { useStore } from "../stores/store.ts";

export function FundingForm() {
  const { addFund } = useStore();
  const form = useForm({
    // Either add the validator here or on `Field`
    validatorAdapter: zodValidator(),
    defaultValues: {
      fundingsource: "",
      maxfunding: "",
      interestrate: "",
    },
    onSubmit: async ({ value }) => {
      const newSource = {
        name: value.fundingsource,
        maxdebt: Number(value.maxfunding),
        interestrate: Number(value.interestrate),
      };
      addFund(newSource);
    },
  });

  return (
    <div className="flex flex-col gap-y-2 rounded-md h-[400px] border px-6 pb-6 w-1/2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="fundingsource"
          validators={{
            onChange: fundingSchema.shape.fundingname,
          }}
          children={(field) => (
            <div className="flex flex-col gap-y-2 mt-3">
              <Label htmlFor={field.name} className="text-lg">
                Financial entity name
              </Label>
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e: CustomChangeEvent) =>
                  field.handleChange(e.target.value)
                }
              />
              {field.state.meta.errors ? (
                <em role="alert">{field.state.meta.errors.join(", ")}</em>
              ) : null}
            </div>
          )}
        />
        <form.Field
          name="maxfunding"
          validators={{
            onChange: fundingSchema.shape.amount,
          }}
          children={(field) => (
            <div className="flex flex-col gap-y-2 mt-3">
              <Label htmlFor={field.name} className="text-lg">
                Maximum funding available
              </Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type="number"
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors ? (
                <em role="alert">{field.state.meta.errors.join(", ")}</em>
              ) : null}
            </div>
          )}
        />
        <form.Field
          name="interestrate"
          validators={{
            onChange: fundingSchema.shape.interestrate,
          }}
          children={(field) => (
            <div className="flex flex-col gap-y-2 mt-3">
              <Label htmlFor={field.name} className="text-lg">
                Interest rate percentage
              </Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type="number"
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors ? (
                <em role="alert">{field.state.meta.errors.join(", ")}</em>
              ) : null}
            </div>
          )}
        />
        {/* Dynamic submit button*/}
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit} className="mt-4 w-full">
              {isSubmitting ? "..." : "Create"}
            </Button>
          )}
        />
      </form>
    </div>
  );
}
