import { useState } from "react";

const useDialog = () => {
  console.log("useDialog");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const openDialog = (status) => {
    setOpen(true);
    let message;
    switch (status) {
      case 404:
        message = "데이터를 찾을 수 없습니다";
        setMessage(message);
        return;
      case 500:
        message = "서버 오류가 발생했습니다";
        setMessage(message);
        return;
      default:
        return;
    }
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return [{ open: open, message: message }, openDialog, closeDialog];
};

export default useDialog;
