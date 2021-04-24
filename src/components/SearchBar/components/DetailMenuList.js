import React, { memo } from "react";
import { withStyles } from "@material-ui/core/styles";
import { DefaultMenuItem } from "../../UI/AppBar/SearchDetailMenu";
import ListItemText from "@material-ui/core/ListItemText";
import ClearBtn from "../../UI/ClearBtn";
import theme from "../../../shared/theme";

const StyledMenuItem = withStyles({
  root: {
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "25vw",
    },
    "& .menu_disabled": {
      color: "#e8e8e8",
    },
  },
})(DefaultMenuItem);

const DetailMenuList = ({ arr, type, onClickList }) => {
  const noListItem = arr.length <= 1;

  const detailList = arr.map((item, idx) => {
    return (
      <StyledMenuItem
        key={`category_${item.index}`}
        disabled={noListItem}
        className={noListItem ? `${StyledMenuItem.root} menu_disabled` : null}
      >
        <ListItemText
          primary={item.value}
          onClick={() => {
            onClickList({ category: item.category, value: item.value });
          }}
        />
        {type === "recent keyword" ? (
          <ClearBtn identifier={item.index} />
        ) : null}
      </StyledMenuItem>
    );
  });

  return detailList;
};

export default DetailMenuList;
