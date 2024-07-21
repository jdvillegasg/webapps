import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  cityZodType,
  type City,
  createFoodValidator,
  cityValues,
  type Food,
} from "../sharedTypes";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const Route = createFileRoute("/create_food")({
  component: CreateFood,
});

function CreateFood() {
  const mutation = useMutation({
    mutationFn: async (food: Food) => {
      return axios
        .post("/api/create-food", { food })
        .then(function (response) {
          console.log(response.data.message);

          //Toast
          form.reset();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  });

  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      title: "",
      carbs: "0",
      fat: "0",
      protein: "0",
      calories: "0",
      sodium: "0",
      fiber: "0",
      vitaA: "0",
      vitaC: "0",
      folic: "0",
      calcium: "0",
      iron: "0",
      price: "",
      description: "",
      personalrating: "",
      potasium: "0",
      magnesium: "0",
      city: cityZodType.Enum.Cali as City,
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      mutation.mutate(value);
    },
  });
  return (
    <div className="flex flex-col gap-y-8 max-w-4xl mx-auto my-10 mb-10 px-12 py-9">
      <h1 className="text-center text-4xl">Enter new food</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="flex flex-col gap-y-4">
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="flex flex-col gap-y-4 rounded border px-8 py-6">
              <h1 className="text-2xl">General info</h1>
              <form.Field
                name="title"
                validators={{
                  onChange: createFoodValidator.shape.title,
                }}
                children={(field) => (
                  <div className="flex flex-col gap-y-2">
                    <Label htmlFor={field.name} className="text-lg">
                      Title
                    </Label>
                    <Input
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors ? (
                      <em role="alert">{field.state.meta.errors.join(", ")}</em>
                    ) : null}
                  </div>
                )}
              />
              <form.Field
                name="description"
                validators={{
                  onChange: createFoodValidator.shape.description,
                }}
                children={(field) => (
                  <div className="flex flex-col gap-y-2">
                    <Label htmlFor={field.name} className="text-lg">
                      Description
                    </Label>
                    <Input
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors ? (
                      <em role="alert">{field.state.meta.errors.join(", ")}</em>
                    ) : null}
                  </div>
                )}
              />
              <form.Field
                name="city"
                validators={{
                  onChange: createFoodValidator.shape.city,
                }}
                children={(field) => (
                  <div className="flex flex-col gap-y-2">
                    <Label htmlFor={field.name} className="text-lg">
                      City
                    </Label>
                    <Select onValueChange={(e) => field.setValue(e as City)}>
                      <SelectTrigger>
                        <SelectValue placeholder="City" />
                      </SelectTrigger>
                      <SelectContent>
                        {cityValues.map((entry, cnt) => {
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
                name="price"
                validators={{
                  onChange: createFoodValidator.shape.price,
                }}
                children={(field) => (
                  <div className="flex flex-col gap-y-2">
                    <Label htmlFor={field.name} className="text-lg">
                      Price
                    </Label>
                    <Input
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
            </div>
            <div className="flex flex-col gap-y-4 rounded border px-8 py-6">
              <h1 className="text-2xl">Macronutrients</h1>
              <form.Field
                name="calories"
                validators={{
                  onChange: createFoodValidator.shape.calories,
                }}
                children={(field) => (
                  <div className="flex flex-col gap-y-2">
                    <Label htmlFor={field.name} className="text-lg">
                      Calories
                    </Label>
                    <Input
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
                name="fat"
                validators={{
                  onChange: createFoodValidator.shape.fat,
                }}
                children={(field) => (
                  <div className="flex flex-col gap-y-2">
                    <Label htmlFor={field.name} className="text-lg">
                      Fat
                    </Label>
                    <Input
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
                name="carbs"
                validators={{
                  onChange: createFoodValidator.shape.carbs,
                }}
                children={(field) => (
                  <div className="flex flex-col gap-y-2">
                    <Label htmlFor={field.name} className="text-lg">
                      Carbohydrates
                    </Label>
                    <Input
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
                name="protein"
                validators={{
                  onChange: createFoodValidator.shape.protein,
                }}
                children={(field) => (
                  <div className="flex flex-col gap-y-2">
                    <Label htmlFor={field.name} className="text-lg">
                      Protein
                    </Label>
                    <Input
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
                name="fiber"
                validators={{
                  onChange: createFoodValidator.shape.fiber,
                }}
                children={(field) => (
                  <div className="flex flex-col gap-y-2">
                    <Label htmlFor={field.name} className="text-lg">
                      Fiber
                    </Label>
                    <Input
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
            </div>
            <div className="flex flex-col gap-y-4 rounded border px-8 py-6">
              <h1 className="text-2xl">Micronutrients</h1>
              <form.Field
                name="iron"
                validators={{
                  onChange: createFoodValidator.shape.iron,
                }}
                children={(field) => (
                  <div className="flex flex-col gap-y-2">
                    <Label htmlFor={field.name} className="text-lg">
                      Iron
                    </Label>
                    <Input
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
                name="folic"
                validators={{
                  onChange: createFoodValidator.shape.folic,
                }}
                children={(field) => (
                  <div className="flex flex-col gap-y-2">
                    <Label htmlFor={field.name} className="text-lg">
                      Folic Acid
                    </Label>
                    <Input
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
                name="calcium"
                validators={{
                  onChange: createFoodValidator.shape.calcium,
                }}
                children={(field) => (
                  <div className="flex flex-col gap-y-2">
                    <Label htmlFor={field.name} className="text-lg">
                      Calcium
                    </Label>
                    <Input
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
                name="potasium"
                validators={{
                  onChange: createFoodValidator.shape.potasium,
                }}
                children={(field) => (
                  <div className="flex flex-col gap-y-2">
                    <Label htmlFor={field.name} className="text-lg">
                      Potasium
                    </Label>
                    <Input
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
                name="magnesium"
                validators={{
                  onChange: createFoodValidator.shape.magnesium,
                }}
                children={(field) => (
                  <div className="flex flex-col gap-y-2">
                    <Label htmlFor={field.name} className="text-lg">
                      Magnesium
                    </Label>
                    <Input
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
                name="vitaA"
                validators={{
                  onChange: createFoodValidator.shape.vitaA,
                }}
                children={(field) => (
                  <div className="flex flex-col gap-y-2">
                    <Label htmlFor={field.name} className="text-lg">
                      Vitamin A
                    </Label>
                    <Input
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
                name="vitaC"
                validators={{
                  onChange: createFoodValidator.shape.vitaC,
                }}
                children={(field) => (
                  <div className="flex flex-col gap-y-2">
                    <Label htmlFor={field.name} className="text-lg">
                      Vitamin C
                    </Label>
                    <Input
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
            </div>
            <div className="flex flex-col gap-y-4 rounded border px-8 py-6">
              <h1 className="text-2xl">Toxic</h1>
              <form.Field
                name="sodium"
                validators={{
                  onChange: createFoodValidator.shape.sodium,
                }}
                children={(field) => (
                  <div className="flex flex-col gap-y-2">
                    <Label htmlFor={field.name} className="text-lg">
                      Sodium
                    </Label>
                    <Input
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
            </div>
          </div>
          <form.Field
            name="personalrating"
            validators={{
              onChange: createFoodValidator.shape.personalrating,
            }}
            children={(field) => (
              <div className="flex flex-col gap-y-2 w-full">
                <Label htmlFor={field.name} className="text-lg">
                  Personal rating
                </Label>
                <Input
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
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit} className="mt-4">
                {isSubmitting ? "..." : "Create"}
              </Button>
            )}
          />
        </div>
      </form>
    </div>
  );
}
