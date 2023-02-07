import React from "react";
import {
  Cell,
  LabelList,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  //console.log(percent);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  );
};

const DoughnutCh = ({ chartData }) => {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          dataKey="value"
          data={chartData}
          innerRadius={50}
          outerRadius={110}
          cx={170}
          cy={160}
          fill="#8884d8"
          labelLine={false}
          label={renderCustomizedLabel}
        >
          {chartData.map((entry, index) => {
            return <Cell key={`cell-${index}`} fill={entry.color} />;
          })}
        </Pie>
        <Legend verticalAlign="top" height={20} />

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DoughnutCh;
