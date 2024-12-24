import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

export default function ModalError({ error, open, setOpen }) {
  const errorMessages = React.useMemo(() => {
    const messages = [];
    const { error: errorMessage, errors } = error?.response?.data || {};
    if (errorMessage) messages.push(errorMessage);
    if (errors) {
      try {
        errors.forEach((err) => messages.push(err.message));
      } catch (err) {
        console.log(err);
      }
    }
    return messages;
  }, [error]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'>
        <DialogTitle>Erreur lors de la création</DialogTitle>
        <DialogContent>
          {errorMessages.map((message, index) => (
            <DialogContentText key={index} color='error'>
              {message}
            </DialogContentText>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Compris</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
