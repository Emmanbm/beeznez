import React, { useMemo, useState } from "react";
import {
  TextField,
  Checkbox,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Grid,
  MenuItem,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { cyan, green, red, blueGrey } from "@mui/material/colors";
import { useForm } from "react-hook-form";
import DateSelector from "../FormFields/DateSelector";
import { useDispatch, useSelector } from "react-redux";
import useServerApi from "../../hooks/useServerApi";
import LoadingButton from "../LoadingButton";
import { addTask, deleteTask, updateTask } from "../../redux/user";
import { sortTasks } from "../../utils/sortTask";
import dayjs from "dayjs";
import { getUsersToAssingTask } from "../../utils/getUsersToAssignTask";
import CustomSelect from "./CustomSelect";
import CustomTextField from "./CustomTextField";

const priorityOptions = [
  { label: "Basse", key: "low" },
  { label: "Moyenne", key: "medium" },
  { label: "Haute", key: "high" },
  { label: "Complété", key: "completed" },
];

const dataKeys = ["name", "description", "priority", "dueDate"];

const TodoList = ({ tasks = [] }) => {
  const { id, role, users, firstName, lastName } = useSelector(
    (store) => store.user || {}
  );
  const usersOptions = useMemo(() => {
    const currentUser = ["admin", "manager"].includes(role)
      ? null
      : { id, firstName, lastName, role };
    return getUsersToAssingTask(users, role, currentUser);
  }, [id, role, users, firstName, lastName]);

  const dispatch = useDispatch();

  const [{ loading }, refresh] = useServerApi({}, { manual: true });

  const { register, handleSubmit, setValue } = useForm();

  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedUser, setSelectedUser] = useState(id);
  const [editingTask, setEditingTask] = useState({});
  const [editId, setEditId] = useState(null);

  const { url, method } = useMemo(() => {
    return {
      url: editId ? `/auth/task/${editId}` : "/auth/task",
      method: editId ? "PUT" : "POST",
    };
  }, [editId]);

  const handleDateChange = (date) => {
    setValue("dueDate", date);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log({ name, value });
    setEditingTask((prev) => ({ ...prev, [name]: value }));
  };

  const startEditing = (task) => {
    setEditId(task.id);
    setEditingTask(task);
    Object.keys(task).forEach((k) => {
      if (dataKeys.includes(k)) setValue(k, task[k]);
    });
  };
  const closeEditing = () => {
    setEditId(null);
    setEditingTask({});
    dataKeys.forEach((key) => setValue(key, ""));
  };

  const onSubmit = async (data) => {
    // console.log("onSubmit: ", data);
    // console.log("method: ", method);
    try {
      const response = await refresh({
        url,
        method,
        data: { ...data },
      });
      const task = response.data;

      if (editId) {
        dispatch(updateTask({ updatedTask: task }));
      } else {
        dispatch(addTask({ task }));
      }
      closeEditing();
    } catch (error) {
      console.log(error);
    }
  };

  const checkTask = async (task) => {
    try {
      const response = await refresh({
        url: `/auth/task/${task.id}`,
        method: "PUT",
        data: { ...task, completed: !task.completed },
      });
      const updatedTask = response.data;
      dispatch(updateTask({ updatedTask }));
    } catch (error) {
      console.log(error);
    }
  };

  const removeTask = async (task) => {
    try {
      await refresh({
        url: `/auth/task/${task.id}`,
        method: "DELETE",
      });
      dispatch(deleteTask({ deletedTask: task }));
    } catch (error) {
      console.log(error);
    }
  };

  const mode = useSelector((store) => store.app.mode);
  const nuance = useMemo(() => {
    return mode === "dark" ? 800 : 200;
  }, [mode]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return green[nuance];
      case "medium":
        return cyan[nuance];
      case "high":
        return red[nuance];
      case "completed":
        return blueGrey[nuance];
      default:
        return "#fff";
    }
  };
  return (
    <>
      {!editId && (
        <Grid
          container
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          spacing={2}
          alignItems='center'
          sx={{ mb: 2 }}>
          <CustomTextField
            label='Nom'
            name='name'
            required
            register={register}
          />
          <CustomTextField
            label='Description'
            name='description'
            register={register}
            size='small'
          />
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <DateSelector
              label='Deadline'
              name='dueDate'
              onChange={handleDateChange}
              register={register}
              required
            />
          </Grid>
          <CustomSelect
            label='Priorité'
            name='priority'
            options={priorityOptions}
            register={register}
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
          />
          <CustomSelect
            label='Tâche pour'
            name='userId'
            options={usersOptions}
            optionKey='id'
            optionLabel='fullName'
            register={register}
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          />
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <LoadingButton
              loading={loading}
              startIcon={<AddTaskIcon />}
              title='Ajouter'
              variant='contained'
              color='primary'
              type='submit'
              fullWidth
            />
          </Grid>
        </Grid>
      )}
      <Grid container mb={2}>
        {priorityOptions.map((item) => (
          <Grid
            item
            key={item.key}
            xs={6}
            sm={2}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}>
            <Box
              sx={{
                width: 16,
                height: 16,
                border: `1px solid #444`,
                backgroundColor: getPriorityColor(item.key),
              }}
            />
            <Typography>
              {item.key === "completed"
                ? item.label
                : `Priorité ${item.label.toLocaleLowerCase()}`}
            </Typography>
          </Grid>
        ))}
      </Grid>

      <List>
        {[...sortTasks(tasks)].map((task, index) => (
          <ListItem
            key={index}
            sx={{
              backgroundColor: task.completed
                ? blueGrey[nuance]
                : getPriorityColor(task.priority),
              mb: 1,
              borderRadius: 1,
            }}>
            {editId !== task.id ? (
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
                      onChange={() => checkTask(task)}
                      color='primary'
                    />
                    <IconButton onClick={() => startEditing(task)}>
                      <EditIcon color='primary' />
                    </IconButton>
                    <IconButton onClick={() => removeTask(task)}>
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
                  onSubmit={handleSubmit(onSubmit)}
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
                  <CustomSelect
                    label='Priorité'
                    name='priority'
                    options={priorityOptions}
                    register={register}
                    value={editingTask.priority}
                    onChange={handleDateChange}
                  />
                  <Grid item xs={1}>
                    <IconButton
                      type='button'
                      color='primary'
                      onClick={closeEditing}>
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
        ))}
      </List>
    </>
  );
};

export default TodoList;
