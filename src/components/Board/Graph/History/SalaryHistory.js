import React, { useEffect, useState, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import SalaryLabel from "./SalaryLabel";
import CustomDot from "./CustomDot";

const SalaryHistory = (props) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const { data } = props;
  const dateObj = new Set();

  const historyData = data.map((obj, idx) => {
    const slicedDate = obj.from_date.slice(0, 7);
    const salary = obj.salary;
    dateObj[idx] = slicedDate;
    return { date: slicedDate, salary: salary };
  });

  const onDotActive = (index) => {
    console.log("idx", index);
    setActiveIdx(index);
  };

  const salaryHistory = historyData ? (
    <div>
      <ResponsiveContainer width="100%" height={130}>
        <LineChart data={historyData} margin={{ top: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" interval="preserveStartEnd" />
          <YAxis interval="preserveStartEnd" />
          <Line
            type="monotone"
            dataKey="salary"
            stroke="#82ca9d"
            // label={<SalaryLabel year={dateObj} />}
            dot={<CustomDot onDotActive={onDotActive} activeIdx={activeIdx} />}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  ) : null;

  return salaryHistory;
};

export default SalaryHistory;
