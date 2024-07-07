import { useStore } from "../stores/store.ts";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { type BarPlotOpts } from "../types.ts";

const ChartData: BarPlotOpts = {
  labels: [],
  datasets: [
    {
      label: "Funding sources",
      data: [],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 205, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(201, 203, 207, 0.2)",
      ],
      borderColor: [
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)",
        "rgb(201, 203, 207)",
      ],
      borderWidth: 1,
    },
  ],
};

export function Dashboard() {
  const { advise } = useStore();

  ChartData.labels = [];
  ChartData.datasets[0].data = [];

  advise.map((entry) => {
    ChartData.labels.push(entry.fundingsource);
    ChartData.datasets[0].data.push(entry.optval);
  });

  console.log(ChartData.datasets[0].data);

  return (
    <>
      {/*
        <div className="flex flex-col gap-y-2 justify-center mx-auto mt-6">
        {advise.map((entry, cnt) => (
          <section>
            <h1 key={cnt} className="mt6 text-center text-3xl">
              {entry.fundingsource}
            </h1>
            <span>{entry.optval}</span>
          </section>
        ))}
      </div>
        */}

      <div className="flex flex-col gap-y-2 justify-center mx-auto mt-6 border rounded-md w-full h-52">
        <Bar data={ChartData} className="w-full mx-auto py-2" />
      </div>
    </>
  );
}
