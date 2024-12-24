import { useMemo, useState } from "react";
import {
  Box,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { getPasswordStrength } from "../../utils/getPasswordStrength";

const PasswordField = ({
  id = "your-password",
  FilledInputProps,
  name,
  label,
  formErrors,
  apiErrors,
  placeholder = "******",
  displayStrength = false,
  ...otherProps
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangePassword = (event) => {
    const password = event.target.value;
    setStrength(getPasswordStrength(password));
  };

  const getStrengthColor = (score) => {
    if (score <= 1) return "error";
    if (score <= 3) return "warning";
    if (score < 6) return "success";
    return "inherit";
  };

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
    <Box>
      <FormControl
        variant='filled'
        onChange={handleChangePassword}
        {...otherProps}>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <FilledInput
          placeholder={placeholder}
          error={!!formErrors?.[name] || !!apiErrors?.[name]}
          label={label}
          name={name}
          {...FilledInputProps}
          id={id}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge='end'>
                {!showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      {displayStrength && Boolean(strength) && (
        <Box mt={1}>
          <LinearProgress
            variant='determinate'
            value={(strength / 6) * 100}
            color={getStrengthColor(strength)}
          />
          <Typography
            fontSize='small'
            textAlign='center'
            color={getStrengthColor(strength)}>
            {strength <= 1
              ? "Faible"
              : strength <= 3
              ? "Moyen"
              : strength < 6
              ? "Fort"
              : "Excellent"}
          </Typography>
        </Box>
      )}
      {helperText && (
        <Typography
          fontSize='small'
          color='error'
          textAlign='center'
          flexWrap='wrap'>
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export default PasswordField;
