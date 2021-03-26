import React, { useState } from "react";

const TextTEST = () => {
  const [test, setTest] = useState("test");

  return <div>{test}</div>;
};

export default TextTEST;
