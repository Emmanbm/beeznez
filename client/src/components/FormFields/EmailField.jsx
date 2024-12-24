import React, { useMemo } from "react";
import { TextField, Typography } from "@mui/material";

const EmailField = ({
  name = "email",
  label = "Adresse Email",
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
      <TextField
        fullWidth
        label={label}
        {...register(name, {
          required: "L'adresse email est obligatoire",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "L'adresse email n'est pas valide",
          },
        })}
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

export default EmailField;
