import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useDispatch, useSelector } from "react-redux";
import CancelIcon from "@mui/icons-material/Cancel";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import { useMemo } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const ModalInfo = () => {
  const { open, data } = useSelector(
    (store) => store.tempData?.modals?.modalInfo || {}
  );
  const { message, type, afterClose } = useMemo(() => {
    try {
      const message = data?.message;
      const type = data?.type?.toLocaleLowerCase();
      const afterClose = data?.afterClose;
      return { message, type, afterClose };
    } catch (error) {
      console.log("Erreur lors du parsing de la données du modalInfo :", error);
      return {};
    }
  }, [data?.message, data?.type, data?.afterClose]);

  const typeIcon = {
    error: CancelIcon,
    success: ThumbUpAltIcon,
    info: InfoIcon,
  }[type?.toLocaleLowerCase()];

  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch({ type: "tempData/closeModal", payload: { modal: "modalInfo" } });
    if (typeof afterClose === "function") {
      console.log("Closing...");
      afterClose();
    }
  };
  if (!message || !["success", "info", "error"].includes(type)) {
    console.log("ModalInfo : Données incomplètes");
    return null; // Ne pas afficher le modal si données incomplètes ou invalides.
  }
  return (
    <Dialog
      TransitionComponent={Transition}
      open={open}
      onClose={handleClose}
      aria-labelledby={`${type}-dialog-title`}>
      <DialogTitle
        color={type}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        {React.createElement(typeIcon, {
          sx: { fontSize: 80, minWidth: 240 },
          color: type,
        })}
      </DialogTitle>
      <DialogContent>
        <DialogContentText color={type} textAlign='center'>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color='primary'
          variant='contained'
          startIcon={<CloseIcon />}>
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalInfo;
