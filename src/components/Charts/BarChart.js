import React from "react";
import {
  BarChart as ChartBar,
  Bar,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  Cell,
} from "recharts";

const BarChart = ({ data }) => {
  return (
    <ResponsiveContainer height={320} width="95%">
      <ChartBar data={data}>
        <CartesianGrid vertical={false} opacity="0.3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend
          verticalAlign="top"
          height={30}
          payload={[{ color: "tomato", value: "Daily Expenses", type: "rect" }]}
        />
        <Bar
          dataKey="value"
          barSize={60}
          label={{
            fill: "rgb(126 170 225)",
            fontSize: 15,
            position: "top",
            formatter: (value) => "$" + value,
          }}
        >
          {data.map((entry, index) => {
            return <Cell key={`cell-${index}`} fill={entry.color} />;
          })}
        </Bar>
      </ChartBar>
    </ResponsiveContainer>
  );
};

export default BarChart;
