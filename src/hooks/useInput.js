import { useState } from "react";
import { useDispatch } from "react-redux";
import { setInpVal } from "../store/actions/searchBar";
import { debounce } from "lodash";

const useInput = (initValue) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(initValue);

  const save = debounce(() => {
    dispatch(setInpVal(value));
  }, [500]);

  const onChangeHandler = (e) => {
    const { value } = e.target;
    console.log(value);
    setValue(value);
    save();
  };
  return [value, onChangeHandler];
};

export default useInput;
