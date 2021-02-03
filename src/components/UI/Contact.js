import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";

const useStyles = makeStyles({
  employeeInfo: {
    textAlign: "center",
  },
});

const Contact = (props) => {
  const classes = useStyles();
  const { onClose, selectedValue, open, employeeInfo } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const email = "test@gmail.com";
  const tel = "010-9999-9999";

  return (
    <Dialog onClose={handleClose} aria-labelledby="contact" open={open}>
      <DialogTitle id="contact">
        <Typography
          className={classes.employeeInfo}
          variant="h4"
          component="h2"
        >
          {employeeInfo.name}
        </Typography>
      </DialogTitle>
      <List>
        <ListItem button onClick={() => handleListItemClick(email)}>
          <ListItemAvatar>
            <Avatar>
              <PhoneIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={tel} />
        </ListItem>
        <ListItem button onClick={() => handleListItemClick(email)}>
          <ListItemAvatar>
            <Avatar>
              <EmailIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={email} />
        </ListItem>
      </List>
    </Dialog>
  );
};

Contact.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default Contact;
