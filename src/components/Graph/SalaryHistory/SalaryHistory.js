import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const SalaryHistory = (props) => {
  const { data } = props;
  const [history, setHistory] = useState(null);
  console.log("SalHistory", data);

  useEffect(() => {
    if (!data) return;
    const historyData = data.map((obj, idx) => {
      const slicedDate = obj.from_date.slice(0, 7);
      const salary = obj.salary;
      return { date: slicedDate, salary: salary };
    });

    setHistory(historyData);
  }, [data]);

  const salaryHistory = history ? (
    <div>
      <LineChart width={300} height={100} data={history}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" interval="preserveStartEnd" />
        <YAxis interval="preserveStartEnd" />
        <Tooltip />
        <Line type="monotone" dataKey="salary" stroke="#82ca9d" />
      </LineChart>
    </div>
  ) : null;

  return salaryHistory;
};

export default SalaryHistory;
