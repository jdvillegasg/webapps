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
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import {
  type NutritionProfiles,
  nutritionReqValidator,
  nutritionProfilesZodType,
  type JustFood,
} from "../sharedTypes";
import { nutritionProfiles } from "@/consts";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2 flex flex-col">
      <h1 className="text-center text-4xl mt-16">Nutrition requirements</h1>
      <ChooseNutritionReq></ChooseNutritionReq>
    </div>
  );
}

function FoodPreferenceUI() {
  return <div></div>;
}

function ChooseNutritionReq() {
  const mutation = useMutation({
    mutationFn: async (nutritionreq: JustFood) => {
      return axios
        .post("/api/advise", { nutritionreq })
        .then(function (response) {
          console.log(response.data.optsolution);

          //Toast
          if (response.data.error === 0) {
            toast.success("Solution found");
          } else {
            toast("Error", { description: "Error getting optimal" });
          }

          // Reset form
          //form.reset();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  });

  const [nutritionVals, setNutritionVals] = useState(
    nutritionProfiles.gainWeight
  );

  const [customVal, setCustomVal] = useState(false);

  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      carbs: "0",
      fat: "0",
      protein: "0",
      calories: "0",
      sodium: "0",
      fiber: "0",
      vitaa: "0",
      vitac: "0",
      vitab12: "0",
      folic: "0",
      calcium: "0",
      iron: "0",
      potasium: "0",
      magnesium: "0",
      profile: nutritionProfilesZodType.Enum.custom as NutritionProfiles,
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
      mutation.mutate(value);
    },
  });

  const handleSelect = (e: string) => {
    if (e === "gainWeight") {
      form.setFieldValue("carbs", `${nutritionProfiles.gainWeight.carbsreq}`);
      form.setFieldValue("fat", `${nutritionProfiles.gainWeight.fatreq}`);
      form.setFieldValue(
        "protein",
        `${nutritionProfiles.gainWeight.proteinreq}`
      );
      form.setFieldValue(
        "calories",
        `${nutritionProfiles.gainWeight.caloriesreq}`
      );
      form.setFieldValue("sodium", `${nutritionProfiles.gainWeight.sodiumreq}`);
      form.setFieldValue("fiber", `${nutritionProfiles.gainWeight.fiberreq}`);
      form.setFieldValue("vitaa", `${nutritionProfiles.gainWeight.vitaAreq}`);
      form.setFieldValue("vitac", `${nutritionProfiles.gainWeight.vitaCreq}`);
      form.setFieldValue(
        "vitab12",
        `${nutritionProfiles.gainWeight.vitaB12req}`
      );
      form.setFieldValue("folic", `${nutritionProfiles.gainWeight.folicreq}`);
      form.setFieldValue(
        "calcium",
        `${nutritionProfiles.gainWeight.calciumreq}`
      );
      form.setFieldValue("iron", `${nutritionProfiles.gainWeight.ironreq}`);
      form.setFieldValue(
        "potasium",
        `${nutritionProfiles.gainWeight.potasiumreq}`
      );
      form.setFieldValue(
        "magnesium",
        `${nutritionProfiles.gainWeight.magnesiumreq}`
      );
      setNutritionVals(nutritionProfiles.gainWeight);
      setCustomVal(false);
    }
    if (e === "loseWeight") {
      form.setFieldValue("carbs", `${nutritionProfiles.loseWeight.carbsreq}`);
      form.setFieldValue(
        "calories",
        `${nutritionProfiles.loseWeight.caloriesreq}`
      );
      form.setFieldValue("sodium", `${nutritionProfiles.loseWeight.sodiumreq}`);
      form.setFieldValue("fiber", `${nutritionProfiles.loseWeight.fiberreq}`);
      form.setFieldValue("vitaa", `${nutritionProfiles.loseWeight.vitaAreq}`);
      form.setFieldValue("vitac", `${nutritionProfiles.loseWeight.vitaCreq}`);
      form.setFieldValue(
        "vitab12",
        `${nutritionProfiles.loseWeight.vitaB12req}`
      );
      form.setFieldValue("folic", `${nutritionProfiles.loseWeight.folicreq}`);
      form.setFieldValue(
        "calcium",
        `${nutritionProfiles.loseWeight.calciumreq}`
      );
      form.setFieldValue("iron", `${nutritionProfiles.loseWeight.ironreq}`);
      form.setFieldValue(
        "potasium",
        `${nutritionProfiles.loseWeight.potasiumreq}`
      );
      form.setFieldValue(
        "magnesium",
        `${nutritionProfiles.loseWeight.magnesiumreq}`
      );
      setNutritionVals(nutritionProfiles.loseWeight);
      setCustomVal(false);
    }
    if (e === "custom") {
      form.setFieldValue("carbs", "0");
      form.setFieldValue("fat", "0");
      form.setFieldValue("protein", "0");
      form.setFieldValue("calories", "0");
      form.setFieldValue("sodium", "0");
      form.setFieldValue("fiber", "0");
      form.setFieldValue("vitaa", "0");
      form.setFieldValue("vitac", "0");
      form.setFieldValue("vitab12", "0");
      form.setFieldValue("folic", "0");
      form.setFieldValue("calcium", "0");
      form.setFieldValue("iron", "0");
      form.setFieldValue("potasium", "0");
      form.setFieldValue("magnesium", "0");
      setCustomVal(true);
    }
  };

  return (
    <div className="flex flex-col gap-y-8 max-w-4xl mx-auto my-2 mb-10 px-12 py-9">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="flex flex-col gap-y-4 border rounded-md p-8">
          <div className="flex flex-row justify-between">
            <h3 className="text-lg mb-6">
              Choose nutrition requirements profile
            </h3>
            <form.Field
              name="profile"
              validators={{
                onChange: nutritionReqValidator.shape.profile,
              }}
              children={(field) => (
                <div className="pl-8">
                  <Select onValueChange={(e) => handleSelect(e)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Nutrition profile" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(nutritionProfiles).map(
                        ([key, val], cnt) => {
                          return (
                            <SelectItem value={key} key={cnt}>
                              {key}
                            </SelectItem>
                          );
                        }
                      )}
                      <SelectItem value="custom">custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
          </div>
          <div className="grid grid-cols-3 gap-x-8">
            <form.Field
              name="carbs"
              validators={{
                onChange: nutritionReqValidator.shape.carbs,
              }}
              children={(field) => (
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor={field.name} className="text-lg">
                    Carbohydrates
                  </Label>
                  <Input
                    name={field.name}
                    value={
                      customVal ? field.state.value : nutritionVals.carbsreq
                    }
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
                onChange: nutritionReqValidator.shape.fat,
              }}
              children={(field) => (
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor={field.name} className="text-lg">
                    Fat
                  </Label>
                  <Input
                    name={field.name}
                    value={customVal ? field.state.value : nutritionVals.fatreq}
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
                onChange: nutritionReqValidator.shape.carbs,
              }}
              children={(field) => (
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor={field.name} className="text-lg">
                    Protein
                  </Label>
                  <Input
                    name={field.name}
                    value={
                      customVal ? field.state.value : nutritionVals.proteinreq
                    }
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
              name="calories"
              validators={{
                onChange: nutritionReqValidator.shape.carbs,
              }}
              children={(field) => (
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor={field.name} className="text-lg">
                    Calories
                  </Label>
                  <Input
                    name={field.name}
                    value={
                      customVal ? field.state.value : nutritionVals.caloriesreq
                    }
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
              name="sodium"
              validators={{
                onChange: nutritionReqValidator.shape.carbs,
              }}
              children={(field) => (
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor={field.name} className="text-lg">
                    Sodium
                  </Label>
                  <Input
                    name={field.name}
                    value={
                      customVal ? field.state.value : nutritionVals.sodiumreq
                    }
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
                onChange: nutritionReqValidator.shape.carbs,
              }}
              children={(field) => (
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor={field.name} className="text-lg">
                    Fiber
                  </Label>
                  <Input
                    name={field.name}
                    value={
                      customVal ? field.state.value : nutritionVals.fiberreq
                    }
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
              name="vitaa"
              validators={{
                onChange: nutritionReqValidator.shape.carbs,
              }}
              children={(field) => (
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor={field.name} className="text-lg">
                    Vitamin A
                  </Label>
                  <Input
                    name={field.name}
                    value={
                      customVal ? field.state.value : nutritionVals.vitaAreq
                    }
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
              name="vitac"
              validators={{
                onChange: nutritionReqValidator.shape.carbs,
              }}
              children={(field) => (
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor={field.name} className="text-lg">
                    Vitamin C
                  </Label>
                  <Input
                    name={field.name}
                    value={
                      customVal ? field.state.value : nutritionVals.vitaCreq
                    }
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
              name="vitab12"
              validators={{
                onChange: nutritionReqValidator.shape.carbs,
              }}
              children={(field) => (
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor={field.name} className="text-lg">
                    Vitamin B12
                  </Label>
                  <Input
                    name={field.name}
                    value={
                      customVal ? field.state.value : nutritionVals.vitaB12req
                    }
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
                onChange: nutritionReqValidator.shape.carbs,
              }}
              children={(field) => (
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor={field.name} className="text-lg">
                    Folate
                  </Label>
                  <Input
                    name={field.name}
                    value={
                      customVal ? field.state.value : nutritionVals.folicreq
                    }
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
                onChange: nutritionReqValidator.shape.carbs,
              }}
              children={(field) => (
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor={field.name} className="text-lg">
                    Calcium
                  </Label>
                  <Input
                    name={field.name}
                    value={
                      customVal ? field.state.value : nutritionVals.calciumreq
                    }
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
              name="iron"
              validators={{
                onChange: nutritionReqValidator.shape.carbs,
              }}
              children={(field) => (
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor={field.name} className="text-lg">
                    Iron
                  </Label>
                  <Input
                    name={field.name}
                    value={
                      customVal ? field.state.value : nutritionVals.ironreq
                    }
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
                onChange: nutritionReqValidator.shape.carbs,
              }}
              children={(field) => (
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor={field.name} className="text-lg">
                    Potasium
                  </Label>
                  <Input
                    name={field.name}
                    value={
                      customVal ? field.state.value : nutritionVals.potasiumreq
                    }
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
                onChange: nutritionReqValidator.shape.carbs,
              }}
              children={(field) => (
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor={field.name} className="text-lg">
                    Magnesium
                  </Label>
                  <Input
                    name={field.name}
                    value={
                      customVal ? field.state.value : nutritionVals.magnesiumreq
                    }
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
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit} className="mt-4">
                {isSubmitting ? "..." : "Submit"}
              </Button>
            )}
          />
        </div>
      </form>
    </div>
  );
}
