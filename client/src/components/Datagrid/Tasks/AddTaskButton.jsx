import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import useServerApi from "../../../hooks/useServerApi";
import { addTask } from "../../../redux/user";
import LoadingButton from "../../LoadingButton";
import CustomSelect from "../../FormFields/CustomSelect";
import DateSelector from "../../FormFields/DateSelector";

const priorityOptions = [
  { label: "Basse", key: "low" },
  { label: "Moyenne", key: "medium" },
  { label: "Haute", key: "high" },
];

const AddTaskButton = () => {
  const userId = useSelector((store) => store.user.id);
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm();
  const [{ loading }, refresh] = useServerApi(
    { url: "/auth/task", method: "POST" },
    { manual: true }
  );
  const [selectedValue, setSelectedValue] = useState("");
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = async (data) => {
    console.log("onSubmit: ", data);
    try {
      const response = await refresh({ data: { ...data, userId } });
      const task = response.data;
      dispatch(addTask({ task }));
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDateChange = (date) => {
    // console.log("Selected date:", date?.format("DD/MM/YYYY"));
    setValue("dueDate", date || "");
  };

  return (
    <>
      <Button
        size='small'
        startIcon={<AddTaskIcon />}
        onClick={handleClickOpen}>
        Ajouter
      </Button>
      <Dialog open={open} component='form' onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Ajouter une tâche</DialogTitle>
        <DialogContent>
          <CustomTextField
            name='name'
            label='Titre'
            register={register}
            required
          />
          <CustomTextField
            name='description'
            label='Description'
            register={register}
            multiline
          />
          <FormControl
            fullWidth
            {...register("priority")}
            size='small'
            margin='dense'>
            <InputLabel id='select-user-priority'>Priorité</InputLabel>
            <Select
              labelId='select-user-priority'
              name='priority'
              id='select-priority'
              value={selectedValue}
              label='Priorité'
              onChange={(e) => setSelectedValue(e.target.value)}>
              {priorityOptions.map((item) => (
                <MenuItem key={item.key} value={item.key}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <DateSelector
            label='Deadline'
            name='dueDate'
            onChange={handleDateChange}
            register={register}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='error' onClick={handleClose}>
            Fermer
          </Button>
          <LoadingButton
            loading={loading}
            type='submit'
            title='Ajouter'
            variant='contained'
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

const CustomTextField = ({ name, label, register, required, multiline }) => {
  return (
    <TextField
      fullWidth
      label={label}
      name={name}
      {...register(name)}
      required={required}
      size='small'
      margin='dense'
      multiline
      rows={multiline ? 2 : 1}
    />
  );
};

export default AddTaskButton;
