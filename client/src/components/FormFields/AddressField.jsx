import React from "react";
import { TextField, Typography } from "@mui/material";

const AddressField = ({
  name = "address",
  label = "Adresse postale",
  register,
  errors,
  ...otherProps
}) => {
  return (
    <div>
      <TextField
        fullWidth
        label={label}
        {...register(name)}
        error={!!errors?.[name]}
        // helperText={errors?.[name]?.message || ""}
        {...otherProps}
      />
      {errors?.[name] && (
        <Typography fontSize='small' color='error' textAlign='center'>
          {errors[name].message}
        </Typography>
      )}
    </div>
  );
};

export default AddressField;
