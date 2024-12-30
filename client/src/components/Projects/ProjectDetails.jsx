import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/tempData";
import TodoList from "../ToDoList/ToDoList";

const ProjectDetails = () => {
  const { open, data } = useSelector(
    (store) => store.tempData.modals.projectDetails || {}
  );
  const projects = useSelector((store) => store.user.projects || []);
  const project = useMemo(() => {
    return projects.find((p) => p.id === data?.id) || {};
  }, [data?.id, data?.tasks]);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeModal({ modal: "projectDetails" }));
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth='lg'
      scroll='paper'>
      <DialogTitle>{project?.name}</DialogTitle>
      <DialogContent>
        <DialogContentText mb={2} variant='subtitle2'>
          <strong>Description</strong>: {project?.description}
        </DialogContentText>
        <DialogContentText
          sx={{
            color: (theme) =>
              theme.palette.mode === "light" ? "black" : "white",
          }}>
          Liste des tâches
        </DialogContentText>
        <TodoList tasks={project?.tasks || []} projectId={project?.id} />
      </DialogContent>
      <DialogActions>
        <Button
          size='small'
          variant='contained'
          onClick={handleClose}
          color='error'>
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectDetails;
