import React, { useMemo, useState } from "react";
import { Typography, List, Grid, Box } from "@mui/material";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { cyan, green, red, blueGrey } from "@mui/material/colors";
import { useForm } from "react-hook-form";
import DateSelector from "../FormFields/DateSelector";
import { useDispatch, useSelector } from "react-redux";
import useServerApi from "../../hooks/useServerApi";
import LoadingButton from "../LoadingButton";
import { addTask, updateProject, updateTask } from "../../redux/user";
import { sortTasks } from "../../utils/sortTask";
import { getUsersToAssingTask } from "../../utils/getUsersToAssignTask";
import CustomSelect from "./CustomSelect";
import CustomTextField from "./CustomTextField";
import Task from "./Task";

const priorityOptions = [
  { label: "Basse", key: "low" },
  { label: "Moyenne", key: "medium" },
  { label: "Haute", key: "high" },
  { label: "Complété", key: "completed" },
];

const dataKeys = ["name", "description", "priority", "dueDate"];

const TodoList = ({ tasks = [], projectId = null }) => {
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

  const { url, method } = useMemo(() => {
    return {
      url: editingTask.id
        ? `/auth/task/${editingTask.id}` // Dans le cas de modification (PUT) d'une tâche, on la modifie directe
        : projectId // Dans le cas de création (POST) d'une tâche, on vérifie d'abord si elle doit être liée à un projet ou non
        ? `/auth/project/${projectId}/tasks`
        : "/auth/task",
      method: editingTask.id ? "PUT" : "POST",
    };
  }, [editingTask.id]);

  const handleDateChange = (date) => {
    setValue("dueDate", date);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingTask((prev) => ({ ...prev, [name]: value }));
  };

  const startEditing = (task) => {
    setEditingTask(task);
    Object.keys(task).forEach((k) => {
      if (dataKeys.includes(k)) setValue(k, task[k]);
    });
  };
  const closeEditing = () => {
    setEditingTask({});
    dataKeys.forEach((key) => setValue(key, ""));
  };

  const onSubmit = async (data) => {
    // console.log("onSubmit: ", data);
    // console.log("url: ", url);
    // console.log("method: ", method);
    try {
      const response = await refresh({
        url,
        method,
        data: { ...data },
      });
      const { task, project } = response.data;
      if (project) {
        // Cela veut dire qu'on vient d'ajouter une tâche à un projet, donc le backend nous renvoie un objet project
        dispatch(updateProject({ updatedProject: project }));
      }
      if (editingTask.id) {
        dispatch(updateTask({ updatedTask: task }));
      } else {
        dispatch(addTask({ task }));
      }
      closeEditing();
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
      {!editingTask.id && (
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
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <CustomSelect
              label='Priorité'
              name='priority'
              options={priorityOptions.filter(
                (option) => option.key !== "completed"
              )}
              register={register}
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
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
          </Grid>

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
          <Task
            key={task.id}
            task={task}
            editingTask={editingTask}
            startEditing={startEditing}
            backgroundColor={
              task.completed
                ? blueGrey[nuance]
                : getPriorityColor(task.priority)
            }
            register={register}
            onSubmit={handleSubmit(onSubmit)}
            handleDateChange={handleDateChange}
            handleInputChange={handleInputChange}
            closeEditing={closeEditing}
            priorityOptions={priorityOptions}
          />
        ))}
      </List>
    </>
  );
};

export default TodoList;
