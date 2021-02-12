import { useState } from "react";

const useInput = (initValue) => {
  const [value, setValue] = useState(initValue);

  const onChangeHandler = (e) => {
    const { value } = e.target;
    console.log(value);
    setValue(value);
  };
  return [value, onChangeHandler];
};

export default useInput;
