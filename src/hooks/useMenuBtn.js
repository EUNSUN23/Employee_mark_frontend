import { useState } from "react";

const useMenuBtn = (initValue) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [title, setMenuTitle] = useState(initValue);

  const onClickAnchor = ({ currentTarget }) => setAnchorEl(currentTarget);

  const onClose = () => setAnchorEl(null);

  const onMenuItemClick = (value) => {
    setMenuTitle(value);
    onClose();
  };

  return [
    { anchorEl: anchorEl, title: title },
    {
      onClickAnchor: onClickAnchor,
      onMenuItemClick: onMenuItemClick,
      onClose: onClose,
    },
  ];
};

export default useMenuBtn;
