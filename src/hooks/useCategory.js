import React, { useState } from "react";

const useCategory = (initCategory) => {
  const [dept, setDept] = useState(initCategory);
  const [title, setTitle] = useState(initCategory);

  const setCategory = (type, data) => {
    switch (type) {
      case "dept":
        setDept(data);
        return;
      case "title":
        setTitle(data);
        return;
      default:
        return;
    }
  };
  return [{ dept: dept, title: title }, setCategory];
};

export default useCategory;
