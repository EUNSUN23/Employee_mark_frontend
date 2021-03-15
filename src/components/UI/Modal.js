import React, { memo } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import ErrorIcon from "@material-ui/icons/Error";

const useStyles = makeStyles({
  wrapper: {
    width: 300,
  },
  employeeInfo: {
    position: "relative",
    textAlign: "center",
    padding: 4,
    paddingLeft: 35,
    fontSize: 20,
    "& .icon": {
      position: "absolute",
      left: "-5%",
      top: "10%",
    },
  },
});

const Modal = memo((props) => {
  const classes = useStyles();
  const { handleClose, open, message } = props;

  return (
    <Dialog onClose={handleClose} aria-labelledby="contact" open={open}>
      <DialogTitle id="contact" className={classes.wrapper}>
        <Typography className={classes.employeeInfo}>
          <ErrorIcon className={`${classes.employeeInfo} icon`} />
          <span>{message}</span>
        </Typography>
      </DialogTitle>
    </Dialog>
  );
});

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default Modal;
