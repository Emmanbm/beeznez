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
    <Grid item xs={12} sm={6} md={4} lg={2}>
      <TextField
        select
        label={label}
        name={name}
        {...register(name, { required: Boolean(required) })}
        value={value}
        onChange={onChange}
        size='small'
        fullWidth>
        {options
          .filter((item) => item[optionKey] !== "completed")
          .map((item) => (
            <MenuItem key={item[optionKey]} value={item[optionKey]}>
              {item[optionLabel]}
            </MenuItem>
          ))}
      </TextField>
    </Grid>
  );
};

export default CustomSelect;
