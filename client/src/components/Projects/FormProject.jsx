import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/tempData";
import LoadingButton from "../LoadingButton";
import useServerApi from "../../hooks/useServerApi";
import { addProject, updateProject } from "../../redux/user";
import { useForm } from "react-hook-form";
import CustomTextField from "../CustomTextField";
import DateSelector from "../FormFields/DateSelector";
import { getUsersToAssingTask } from "../../utils/getUsersToAssignTask";
import CustomSelect from "../ToDoList/CustomSelect";
import dayjs from "dayjs";
import MultiSelectAutocomplete from "./MultiSelectAutocomplete";

const priorityOptions = [
  { label: "Basse", key: "low" },
  { label: "Moyenne", key: "medium" },
  { label: "Haute", key: "high" },
];

const FormProject = () => {
  const { open, data: project } = useSelector(
    (store) => store.tempData.modals.formProject || {}
  );
  const { id, role, firstName, lastName, users, companyId } = useSelector(
    (store) => store.user || {}
  );
  const today = new Date();
  const [values, setValues] = useState({
    name: "",
    description: "",
    dueDate: today,
    startDate: today,
    users: [],
    priority: "",
    companyId: companyId || null,
    createdBy: id,
  });

  const usersOptions = useMemo(() => {
    const currentUser = ["admin", "manager"].includes(role)
      ? null
      : { id, firstName, lastName, role };
    return getUsersToAssingTask(users, role, currentUser);
  }, [id, role, users, firstName, lastName]);

  const dispatch = useDispatch();

  const { url, method } = useMemo(() => {
    return {
      url: project?.id ? `auth/project/${project.id}` : "auth/project",
      method: project?.id ? "PUT" : "POST",
    };
  }, [project?.id]);
  const { register, handleSubmit, setValue } = useForm();

  const [{ loading }, refresh] = useServerApi(
    { url, method },
    { manual: true }
  );

  const onSubmit = async () => {
    // const data = { ...values };
    // console.log({ ...values });
    try {
      const response = await refresh({ data: { ...values } });
      const savedProject = response.data;
      console.log(savedProject);

      if (project?.id) {
        dispatch(updateProject({ updatedProject: savedProject }));
      } else {
        dispatch(addProject({ project: savedProject }));
      }
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log({ name, value });
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date, name) => {
    setValues((prev) => ({ ...prev, [name]: date }));
  };

  const handleClose = () => {
    dispatch(closeModal({ modal: "formProject" }));
  };

  useEffect(() => {
    let initialValues = {};
    if (project) {
      initialValues = {
        name: project?.name || "",
        description: project?.description || "",
        dueDate: project?.dueDate || today,
        startDate: project?.startDate || today,
        users: project?.users?.map((user) => user.id) || [],
        companyId: companyId || null,
        priority: project?.priority || "",
        createdBy: id,
      };
    } else {
      initialValues = {
        name: "",
        description: "",
        dueDate: today,
        startDate: today,
        users: [],
        priority: "",
        companyId: companyId || null,
        createdBy: id,
      };
    }
    setValues(initialValues);
    Object.keys(initialValues).forEach((key) => {
      setValue(key, initialValues[key]);
    });
  }, [project?.id]);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      component='form'
      onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>
        {project?.id ? "Modifier le projet" : "Nouveau projet"}
      </DialogTitle>
      <DialogContent>
        <CustomTextField
          variant='outlined'
          name='name'
          label='Nom'
          placeholder='Nom du projet'
          register={register}
          margin='dense'
          onChange={handleInputChange}
          value={values.name}
        />
        <CustomTextField
          variant='outlined'
          name='description'
          label='Description'
          placeholder='Description du projet'
          register={register}
          value={values.description}
          onChange={handleInputChange}
          multiline
          rows={2}
          required={false}
          margin='dense'
        />
        <DateSelector
          label='Date de début'
          name='startDate'
          onChange={(date) => handleDateChange(date, "startDate")}
          value={dayjs(values.startDate)}
          register={register}
          required
        />
        <DateSelector
          label='Date de fin'
          name='dueDate'
          onChange={(date) => handleDateChange(date, "dueDate")}
          value={dayjs(values.dueDate)}
          register={register}
          required
        />
        <CustomSelect
          label='Priorité'
          name='priority'
          options={priorityOptions}
          register={register}
          value={values.priority}
          onChange={handleInputChange}
          margin='dense'
          required
        />
        <MultiSelectAutocomplete
          options={usersOptions}
          setValues={setValues}
          value={usersOptions.filter((user) => values.users.includes(user.id))}
        />
      </DialogContent>
      <DialogActions>
        <LoadingButton
          type='submit'
          loading={loading}
          title='Créer'
          size='small'
          variant='contained'
        />
        <Button
          size='small'
          type='button'
          onClick={handleClose}
          variant='contained'
          color='error'>
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormProject;
