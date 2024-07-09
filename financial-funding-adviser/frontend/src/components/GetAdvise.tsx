import { Button } from "./ui/button.tsx";
import { useStore } from "../stores/store.ts";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "@tanstack/react-form";
import { Input } from "./ui/input.tsx";
import { Label } from "./ui/label.tsx";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { type PostSchema, fundingSchema } from "../types.ts";

export function Advise() {
  const { fundingsource, setAdvise } = useStore();

  const mutation = useMutation({
    mutationFn: async (funds: PostSchema) => {
      return axios
        .post("/api/advise", funds)
        .then(function (response) {
          setAdvise(response.data.optsolution);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  });

  const form = useForm({
    // Either add the validator here or on `Field`
    validatorAdapter: zodValidator(),
    defaultValues: {
      valuetopay: "",
    },
    onSubmit: async ({ value }) => {
      const funds = {
        valuetopay: Number(value.valuetopay),
        funding: fundingsource,
      };
      mutation.mutate(funds);
    },
  });

  return (
    <div className="flex flex-col gap-y-2 rounded-md border px-6 pb-6 mt-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="valuetopay"
          validators={{
            onChange: fundingSchema.shape.valuetopay,
          }}
          children={(field) => (
            <div className="flex flex-col gap-y-2 mt-3">
              <Label htmlFor={field.name} className="text-xl">
                Value to pay
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
            <Button
              type="submit"
              disabled={fundingsource.length > 1 ? false && !canSubmit : true}
              className="mt-4 w-full"
            >
              {isSubmitting ? "..." : "Advise"}
            </Button>
          )}
        />
      </form>
    </div>
  );
}
