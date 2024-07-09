import { useStore } from "../stores/store.ts";
import "chart.js/auto";
import { BarChart } from "@tremor/react";

const dataFormatter = (number: number) =>
  Intl.NumberFormat("us").format(number).toString();

type TypeChartData = {
  name: string;
  "Funding available": number;
};

export function Dashboard() {
  const { advise } = useStore();

  const ChartData: TypeChartData[] = [];
  advise.map((entry) => {
    ChartData.push({
      name: entry.fundingsource,
      "Funding available": entry.optval,
    });
  });

  return (
    <>
      <div className="flex flex-col gap-y-2 justify-center mx-auto mt-6 border rounded-md w-full h-52">
        <BarChart
          className="mt-6"
          data={ChartData}
          index="name"
          categories={["Funding available"]}
          colors={["blue"]}
          valueFormatter={dataFormatter}
          yAxisWidth={48}
        />
      </div>
    </>
  );
}
