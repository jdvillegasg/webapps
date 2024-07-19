import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { setIntervalDateValidator } from "@backend/sharedTypes";
import { useRef } from "react";

async function getLastWeekSpent() {
  const result = await api.expenses["last-week-spent"].$get();

  if (!result.ok) {
    throw new Error("Server error");
  }

  const data = await result.json();
  return data;
}

async function getLastBiWeekSpent() {
  const result = await api.expenses["last-biweek-spent"].$get();

  if (!result.ok) {
    throw new Error("Server error");
  }

  const data = await result.json();
  return data;
}

async function getLastMonthSpent() {
  const result = await api.expenses["last-month-spent"].$get();

  if (!result.ok) {
    throw new Error("Server error");
  }

  const data = await result.json();
  return data;
}

async function getTotalSpent() {
  const result = await api.expenses["total-spent"].$get();
  if (!result.ok) {
    throw new Error("Server error");
  }
  const data = await result.json();
  return data;
}

export function CardLastWeek() {
  const { isPending, error, data } = useQuery({
    queryKey: ["get-last-week-spent"],
    queryFn: getLastWeekSpent,
  });

  if (error) return "Error querying last week expenses spent: " + error.message;

  console.log(data);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Last week spent</CardTitle>
          <CardDescription>Money spent within the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{isPending ? "..." : data.lastweekspent}</p>
        </CardContent>
      </Card>
    </>
  );
}

export function CardLastBiWeek() {
  const { isPending, error, data } = useQuery({
    queryKey: ["get-last-biweek-spent"],
    queryFn: getLastBiWeekSpent,
  });

  if (error) return "Error querying last week expenses spent: " + error.message;

  console.log(data);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Last 2 weeks spent</CardTitle>
          <CardDescription>Money spent within the last 15 days</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{isPending ? "..." : data.lastbiweekspent}</p>
        </CardContent>
      </Card>
    </>
  );
}

export function CardLastMonth() {
  const { isPending, error, data } = useQuery({
    queryKey: ["get-last-month-spent"],
    queryFn: getLastMonthSpent,
  });

  if (error) return "Error querying last week expenses spent: " + error.message;

  console.log(data);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Last month spent</CardTitle>
          <CardDescription>Money spent in the last month</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{isPending ? "..." : data.lastmonthspent}</p>
        </CardContent>
      </Card>
    </>
  );
}

export function CardAnyInterval() {
  const myRef = useRef<string | null>("0");
  const form = useForm({
    validatorAdapter: zodValidator,
    defaultValues: {
      myStartDate: new Date().toISOString(),
      myStopDate: new Date().toISOString(),
    },
    onSubmit: async ({ value }) => {
      const resolve = await api.expenses["any-interval-spent"].$post({
        json: value,
      }); // I didn't consult the use of 'index'. It was suggested by TypeScript and I tried it

      if (!resolve.ok) {
        throw new Error("Server error");
      }

      const data = await resolve.json();
      myRef.current = data.spentInInterval;
    },
  });
  return (
    <>
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Interval spent</CardTitle>
          <CardDescription>
            Money spent within selected interval
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-4 justify-between">
            <form
              className="flex flex-col gap-y-6 mt-4"
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
            >
              <form.Field
                name="myStartDate"
                validators={{
                  onChange: setIntervalDateValidator.shape.myStartDate,
                }}
                children={(field) => (
                  <div className="flex flex-col gap-y-4">
                    <Label htmlFor={field.name} className="text-lg">
                      Start date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "text-center font-normal",
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
              <form.Field
                name="myStopDate"
                validators={{
                  onChange: setIntervalDateValidator.shape.myStopDate,
                }}
                children={(field) => (
                  <div className="flex flex-col gap-y-4">
                    <Label htmlFor={field.name} className="text-lg">
                      Stop date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "text-center font-normal",
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
                  <Button type="submit" disabled={!canSubmit}>
                    {isSubmitting ? "..." : "Get"}
                  </Button>
                )}
              />
            </form>
            <span className="text-center text-3xl my-auto mt-7">
              {myRef.current}
            </span>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export function CardAll() {
  const { isPending, error, data } = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: getTotalSpent,
  });

  //if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  console.log(data);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Total spent</CardTitle>
          <CardDescription>Total amount you've spent</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{isPending ? "..." : data.totalSpent}</p>
        </CardContent>
      </Card>
    </>
  );
}
