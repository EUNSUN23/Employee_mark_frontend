import React, { useState, useCallback } from "react";
import Loader from "../../../../UI/Loader";
import SalaryHistory from "../../../Graph/History/SalaryHistory";
import TransferHistory from "../../../Graph/History/TransferHistory";
import DefaultPanel from "../../../../UI/DefaultPanel";

const History = (props) => {
  const [historyType, setHistoryType] = useState("dept");

  const { expanded, onChangeAccordion, type, data, isLoading } = props;

  const onChangeType = useCallback(
    (type) => {
      setHistoryType(type);
    },
    [setHistoryType]
  );

  const makeHistoryContent = (isLoading, data, historyType) => {
    if (isLoading || !data) return <Loader type="small" />;
    return historyType === "dept" ? (
      <TransferHistory data={data.dept} />
    ) : (
      <SalaryHistory data={data.salary} />
    );
  };

  return (
    <>
      <DefaultPanel
        name="history"
        expanded={expanded}
        type={type}
        getData={onChangeType}
        onChangeAccordion={onChangeAccordion}
      >
        {makeHistoryContent(isLoading, data, historyType)}
      </DefaultPanel>
    </>
  );
};

export default History;
