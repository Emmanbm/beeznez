import { Grid, MenuItem, TextField } from "@mui/material";
import React from "react";

const CustomSelect = ({
  label,
  name,
  value,
  register,
  onChange,
  required,
  options,
  optionKey = "key",
  optionLabel = "label",
}) => {
  return (
    <TextField
      select
      label={label}
      name={name}
      required={required}
      {...register(name, { required: Boolean(required) })}
      value={value}
      onChange={onChange}
      size='small'
      fullWidth>
      {options.map((item) => (
        <MenuItem key={item[optionKey]} value={item[optionKey]}>
          {item[optionLabel]}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default CustomSelect;
