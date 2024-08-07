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

export function Advise() {
  const ChartData: TypeChartData[] = [];
  data?.result.map((entry, cnt) => {
    ChartData.push({
      name: `Bin${cnt}`,
      intervalExpenses: Number(entry),
    });
  });

  return (
    <div>
      <h1>Hey</h1>
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
    </div>
  );
}
