import {
  Checkbox,
  Grid,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import useServerApi from "../../hooks/useServerApi";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../../redux/user";
import dayjs from "dayjs";
import CustomTextField from "./CustomTextField";
import DateSelector from "../FormFields/DateSelector";
import CustomSelect from "./CustomSelect";

const Task = ({
  task,
  editingTask,
  startEditing,
  backgroundColor,
  register,
  onSubmit,
  handleInputChange,
  handleDateChange,
  closeEditing,
  priorityOptions,
}) => {
  const [_, refresh] = useServerApi(
    { url: `/auth/task/${task.id}` },
    { manual: true }
  );
  const dispatch = useDispatch();

  const checkTask = async () => {
    try {
      const response = await refresh({
        method: "PUT",
        data: { ...task, completed: !task.completed },
      });
      const updatedTask = response.data?.task;
      console.log(updatedTask);

      dispatch(updateTask({ updatedTask }));
    } catch (error) {
      console.log(error);
    }
  };

  const removeTask = async () => {
    try {
      await refresh({ method: "DELETE" });
      dispatch(deleteTask({ deletedTask: task }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ListItem
      sx={{
        backgroundColor,
        mb: 1,
        borderRadius: 1,
      }}>
      {editingTask.id !== task.id ? (
        <Grid container>
          <Grid item xs={6} sm={4} md={8}>
            <ListItemText
              primary={`${task.name} (${new Date(
                task.dueDate
              ).toLocaleDateString()})`}
              secondary={`${task.description || ""}`}
              sx={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={4}>
            <ListItemSecondaryAction>
              <Checkbox
                checked={task.completed}
                onChange={checkTask}
                color='primary'
              />
              <IconButton onClick={() => startEditing(task)}>
                <EditIcon color='primary' />
              </IconButton>
              <IconButton onClick={removeTask}>
                <DeleteIcon color='primary' />
              </IconButton>
            </ListItemSecondaryAction>
          </Grid>
        </Grid>
      ) : (
        <>
          <Grid
            container
            component='form'
            onSubmit={onSubmit}
            spacing={2}
            alignItems='center'
            sx={{ mb: 2 }}>
            <CustomTextField
              label='Nom'
              name='name'
              required
              register={register}
              value={editingTask.name}
              onChange={handleInputChange}
            />
            <CustomTextField
              label='Description'
              name='description'
              register={register}
              value={editingTask.description}
              onChange={handleInputChange}
            />
            <Grid item xs={12} sm={2}>
              <DateSelector
                label='Deadline'
                name='dueDate'
                value={dayjs(editingTask.dueDate)}
                onChange={handleDateChange}
                register={register}
                required
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <CustomSelect
                label='Priorité'
                name='priority'
                options={priorityOptions.filter(
                  (option) => option.key !== "completed"
                )}
                register={register}
                value={editingTask.priority}
                onChange={handleDateChange}
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton type='button' color='primary' onClick={closeEditing}>
                <CloseIcon />
              </IconButton>
            </Grid>
            <Grid item xs={1}>
              <IconButton type='submit' color='primary'>
                <SaveIcon />
              </IconButton>
            </Grid>
          </Grid>
        </>
      )}
    </ListItem>
  );
};

export default Task;
