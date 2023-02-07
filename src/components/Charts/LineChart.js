import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as ChartLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const LineChart = ({ data }) => {
  return (
    <ResponsiveContainer height={320} width="95%">
      <ChartLine data={data} width={300}>
        <CartesianGrid vertical={false} opacity="0.3" />
        <XAxis />
        <YAxis interval={0} domain={["dataMin", "dataMax"]} />
        <Tooltip />
        <Legend
          verticalAlign="top"
          height={30}
          payload={[{ color: "tomato", value: "Rates", type: "rect" }]}
        />
        <Line dataKey="value" stroke="#8884d8" type="monotone" dot="value" />
      </ChartLine>
    </ResponsiveContainer>
  );
};

export default LineChart;
