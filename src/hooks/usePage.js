import { useState } from "react";

const usePage = (defaultPage) => {
  const [page, setPage] = useState(defaultPage);

  const addPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const initPage = () => setPage(defaultPage);

  return [{ defaultPage: defaultPage, page: page }, addPage, initPage];
};

export default usePage;
