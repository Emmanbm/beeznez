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
  const { open, data: project } = useSelector(
    (store) => store.tempData.modals.projectDetails || {}
  );
  const projectId = project?.id;
  const allTasks = useSelector((store) => store.user?.tasks || []);
  const projectTasks = useMemo(
    () => allTasks?.filter((task) => task.projectId === projectId && projectId),
    [allTasks, projectId]
  );
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
        <DialogContentText
          mb={2}
          variant='caption'
          sx={{ display: "block", color: "text.secondary" }}>
          <strong>Description</strong>: {project?.description}
        </DialogContentText>
        <DialogContentText
          sx={{
            color: (theme) =>
              theme.palette.mode === "light" ? "black" : "white",
          }}>
          Liste des tâches
        </DialogContentText>
        <TodoList tasks={projectTasks} projectId={projectId} />
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
