import { useState } from "react";

const usePage = (initPage) => {
  const [page, setPage] = useState(initPage);

  const addPage = () => {
    setPage(page + 1);
  };

  return [{ initPage: initPage, page: page }, addPage];
};

export default usePage;
