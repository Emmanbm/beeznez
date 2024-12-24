import React, { useMemo } from "react";
import { TextField as MuiTextField, Typography } from "@mui/material";

const TextField = ({
  name,
  label,
  register,
  formErrors,
  apiErrors,
  ...otherProps
}) => {
  const helperText = useMemo(() => {
    if (formErrors?.[name]) {
      return formErrors[name].message;
    }

    if (apiErrors?.[name]) {
      return apiErrors[name];
    }

    return "";
  }, [formErrors, apiErrors]);
  return (
    <div>
      <MuiTextField
        fullWidth
        label={label}
        {...register(name)}
        error={!!formErrors?.[name] || !!apiErrors?.[name]}
        helperText={helperText}
        {...otherProps}
      />
      {/* {helperText && (
        <Typography fontSize='small' color='error' textAlign='center'>
          {helperText}
        </Typography>
      )} */}
    </div>
  );
};

export default TextField;
