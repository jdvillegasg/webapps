import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type TypeChartData = {
  name: string;
  intervalExpenses: number;
};

async function getMoneySpentDistr(ndays: string) {
  const result = await api.expenses["money-spent-distribution"][
    ":groupbyndays{[1-5]+}"
  ].$get({
    param: { groupbyndays: ndays },
  });

  if (!result.ok) {
    throw new Error("Error fetching money-spent-dist");
  }

  const data = await result.json();
  return data;
}

export function Graphs() {
  const [daysInBin, setDaysInBin] = useState<number[]>([1]);

  const { isPending, error, data } = useQuery({
    queryKey: ["get-money-spent-distr", daysInBin[0]],
    queryFn: () => getMoneySpentDistr(String(daysInBin[0])),
  });

  if (error) return "Error querying last week expenses spent: " + error.message;

  const ChartData: TypeChartData[] = [];
  data?.result.map((entry, cnt) => {
    ChartData.push({
      name: `Bin${cnt}`,
      intervalExpenses: Number(entry),
    });
  });

  return (
    <div className="flex flex-col mt-12 mb-20 gap-y-5">
      <h1 className="text-center text-4xl">Last month expenses distribution</h1>
      <div className="w-full flex flex-col my-auto gap-y-2 py-2 mt-8">
        <Slider
          defaultValue={daysInBin}
          min={1}
          max={5}
          step={1}
          onValueChange={setDaysInBin}
          className="w-[60%] mx-auto"
        />
        <div className="flex flex-row justify-between mx-auto gap-x-4">
          <h3 className="text-center text-2xl">Days per bin:</h3>
          <span className="text-center text-2xl my-auto">{daysInBin[0]}</span>
        </div>
      </div>
      <div className="flex flex-col gap-y-2 justify-center py-6 px-3 mx-auto border rounded-md w-full h-72">
        {isPending ? (
          <span className="text-center text-xl">Loading...</span>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={ChartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar type="monotone" dataKey="intervalExpenses" fill="#2efa05" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="flex flex-row justify-between mx-auto border rounded gap-x-8 w-full">
        <div className="flex flex-row justify-between mx-auto gap-x-6 py-4 px-3">
          <label>Start date: </label>
          <span>{data?.startdate.split("T")[0]}</span>
        </div>
        <div className="flex flex-row justify-between mx-auto gap-x-6 py-4 px-3">
          <label>End date: </label>
          <span>{data?.enddate.split("T")[0]}</span>
        </div>
      </div>
    </div>
  );
}
