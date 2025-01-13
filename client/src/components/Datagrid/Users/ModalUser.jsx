import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../redux/tempData";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Actions from "./Actions/Actions";
import CloseIcon from "@mui/icons-material/Close";

const ModalUser = () => {
  const { open, data } = useSelector(
    (store) => store.tempData.modals.modalUser || {}
  );
  const users = useSelector((store) => store.user.users || []);
  const user = useMemo(() => {
    return users.find((user) => user.id === data?.id) || {};
  }, [data?.id, users]);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeModal({ modal: "modalUser" }));
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{`${user?.firstName} ${user?.lastName}`}</DialogTitle>
      <DialogContent>
        <Actions user={user} />
      </DialogContent>
      <DialogActions>
        <Button
          startIcon={<CloseIcon />}
          size='small'
          variant='contained'
          onClick={handleClose}>
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalUser;
