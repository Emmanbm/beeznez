import { TextField } from "@mui/material";
import React from "react";

const CustomTextField = ({
  register,
  name,
  label,
  placeholder,
  required = true,
  fullWidth = true,
  variant = "filled",
}) => {
  return (
    <TextField
      variant={variant}
      name={name}
      label={label}
      placeholder={placeholder}
      fullWidth={fullWidth}
      required={required}
      {...register(name, { required })}
    />
  );
};

export default CustomTextField;
