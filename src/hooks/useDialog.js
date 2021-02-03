import React, { useState } from "react";

const useDialog = () => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState();

  const openDialog = () => {
    setOpen(true);
  };

  const handleClickList = (selectedValue) => {
    setOpen(false);
    setSelectedValue(selectedValue);
  };

  return [open, selectedValue, openDialog, handleClickList];
};

export default useDialog;
