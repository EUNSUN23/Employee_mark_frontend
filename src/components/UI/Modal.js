import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import ErrorIcon from "@material-ui/icons/Error";

const useStyles = makeStyles({
  employeeInfo: {
    padding: 4,
    textAlign: "center",
  },
});

const Modal = (props) => {
  const classes = useStyles();
  const { open, handleClose, message } = props;
  console.log("MODAL");
  return (
    <Dialog onClose={handleClose} aria-labelledby="contact" open={open}>
      <DialogTitle id="contact">
        <Typography
          className={classes.employeeInfo}
          variant="h4"
          component="h4"
        >
          <ErrorIcon variant="h4" />
          {message}
        </Typography>
      </DialogTitle>
    </Dialog>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default Modal;
