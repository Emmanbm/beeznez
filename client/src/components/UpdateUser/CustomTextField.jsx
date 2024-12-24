import { IconButton, Stack, Tooltip } from "@mui/material";
import React from "react";
import SaveIcon from "@mui/icons-material/Save";

const CustomTextField = ({ name, label, register, ...otherProps }) => {
  return (
    <Stack direction='row'>
      <TextField
        variant='outlined'
        name={name}
        label={label}
        fullWidth
        {...register(name)}
        {...otherProps}
      />
      <IconButton>
        <Tooltip title='Enregistrer'>
          <SaveIcon />
        </Tooltip>
      </IconButton>
    </Stack>
  );
};

export default CustomTextField;
