import { IconButton, Stack, Tooltip } from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import useServerApi from "../../hooks/useServerApi";
import { updateConnectedUser } from "../../redux/user";
import CustomFormElement from "./CustomFormElement";

const CustomEditComponent = ({ value, name, label, ...otherProps }) => {
  const { register, handleSubmit } = useForm();
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const id = useSelector((store) => store.user?.id);
  const dispatch = useDispatch();
  const [{}, refresh] = useServerApi(
    { url: `/auth/update/${id}`, method: "PUT" },
    { manual: true }
  );
  const onSubmit = async (data) => {
    try {
      await refresh({ data });
      dispatch(updateConnectedUser(data));
      setIsBeingEdited(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Stack
      direction='row'
      width='100%'
      alignItems='center'
      component={isBeingEdited ? "form" : "div"}
      onSubmit={handleSubmit(onSubmit)}>
      {isBeingEdited && (
        <Tooltip title='Annuler'>
          <IconButton type='button' onClick={() => setIsBeingEdited(false)}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      )}
      <CustomFormElement
        label={label}
        isBeingEdited={isBeingEdited}
        name={name}
        value={value}
        register={register}
        {...otherProps}
      />
      <Tooltip title={isBeingEdited ? "Enregistrer" : "Modifier"}>
        <IconButton
          onClick={() => setIsBeingEdited(true)}
          type={isBeingEdited ? "submit" : "button"}>
          {isBeingEdited ? <SaveIcon /> : <EditIcon />}
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default CustomEditComponent;
