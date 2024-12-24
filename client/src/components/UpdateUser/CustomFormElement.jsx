import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";

const textFieldFor = [
  "firstName",
  "lastName",
  "email",
  "profilePicture",
  "phone",
  "dateOfBirth",
];

const CustomFormElement = ({
  label,
  isBeingEdited,
  name,
  value,
  register,
  ...otherProps
}) => {
  const [currentValue, setCurrentValue] = useState(value);
  const userRole = useSelector((store) => store.user?.role);
  const roles = useMemo(() => {
    return userRole === "admin"
      ? ["admin", "manager", "employee", "freelance"]
      : ["manager", "employee"];
  }, [userRole]);

  if (!isBeingEdited) {
    return (
      <TextField
        label={label}
        variant='standard'
        size='small'
        value={value}
        fullWidth
        disabled
        {...otherProps}
      />
    );
  } else {
    if (textFieldFor.includes(name)) {
      return (
        <TextField
          label={label}
          variant='outlined'
          size='small'
          name={name}
          defaultValue={value}
          fullWidth
          {...register(name)}
          {...otherProps}
        />
      );
    } else if (name === "password") {
      return (
        <Stack spacing={1} width='100%'>
          <TextField
            label='Mot de passe actuel'
            variant='outlined'
            size='small'
            name='oldPassword'
            fullWidth
            required
            {...register("oldPassword")}
            {...otherProps}
          />
          <TextField
            label='Nouveau mot de passe'
            variant='outlined'
            size='small'
            name='newPassword'
            fullWidth
            required
            {...register("newPassword")}
            {...otherProps}
          />
          {/* {errors?.newPassword && (
            <Typography fontSize='small' color='error' textAlign='center'>
              {errors.password.message}
            </Typography>
          )} */}
        </Stack>
      );
    } else if (name === "role") {
      return (
        <FormControl fullWidth {...register("role")} size='small'>
          <InputLabel id='select-user-role'>Role</InputLabel>
          <Select
            labelId='select-user-role'
            name='role'
            id='select-role'
            value={currentValue}
            label='Role'
            onChange={(e) => setCurrentValue(e.target.value)}>
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role.toLocaleUpperCase()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }
    return null;
  }
};

export default CustomFormElement;
