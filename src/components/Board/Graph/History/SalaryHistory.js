import React, { useEffect, useState, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import CustomDot from "./CustomDot";
import CustomTick from "./CustomTick";
import styled from "styled-components";

const Current = styled.h5`
  width: 80%;
  margin-top: -1%;
  margin-left: 10%;
  background-color: #eeeeee;
  color: #000;
  padding: 1% 0;
  text-align: center;
`;

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
    setActiveIdx(index);
  };

  const salaryHistory = historyData ? (
    <>
      <Current>{`현재 연봉 : ${data[data.length - 1].salary}`}</Current>
      <ResponsiveContainer width="100%" height={100}>
        <LineChart data={historyData} margin={{ right: 40, left: 40 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            interval="preserveStartEnd"
            tick={<CustomTick />}
            ticks={[`${dateObj[0]}`, `${dateObj[data.length - 1]}`]}
            tickLine={false}
          />

          <Line
            type="monotone"
            dataKey="salary"
            stroke="#4caf50"
            dot={<CustomDot onDotActive={onDotActive} activeIdx={activeIdx} />}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  ) : null;

  return salaryHistory;
};

export default SalaryHistory;
