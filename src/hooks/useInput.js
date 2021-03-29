import { useState } from "react";
import { useDispatch } from "react-redux";
import { setInpVal } from "../store/actions/searchBar";

const useInput = (initValue) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(initValue);

  const save = (value) => {
    dispatch(setInpVal(value));
  };

  const onChangeHandler = (e) => {
    const { value } = e.target;
    console.log(value);
    setValue(value);
    save(value);
  };
  return [value, onChangeHandler];
};

export default useInput;
