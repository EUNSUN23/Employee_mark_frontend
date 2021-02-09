import React, { useState } from "react";

const useBtn = (initState) => {
  const [button1, setButton1] = useState(initState);
  const [button2, setButton2] = useState(initState);
  const [text1, setText1] = useState();
  const [text2, setText2] = useState();

  const initBtn = (expanded) => {
    switch (expanded) {
      case "panel1":
        setButton1("dept");
        setText1("부서 이동");
        setButton2("salary");
        setText2("연봉 변동");
        return;
      case "panel2":
        setButton1("steadRank");
        setText1("근속 랭킹");
        setButton2("salaryRank");
        setText2("연봉 랭킹");
      default:
        return;
    }
  };

  return [
    { button1: button1, button2: button2, text1: text1, text2: text2 },
    initBtn,
  ];
};

export default useBtn;
