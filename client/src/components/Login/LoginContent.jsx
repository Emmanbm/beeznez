import { TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import PasswordField from "./PasswordField";

const LoginContent = ({ register, errors }) => {
  return (
    <>
      <TextField
        variant='filled'
        name='email'
        label='Email'
        placeholder='example@beeznez.fr'
        fullWidth
        required
        {...register("email", { required: true })}
      />
      <PasswordField
        fullWidth
        required
        label='Mot de passe'
        variant='filled'
        placeholder='Mot de passe'
        FilledInputProps={{
          name: "password",
          ...register("password", {
            required: true,
            minLength: {
              value: 8,
              message: "Le mot de passe doit contenir au moins 8 caractères",
            },
          }),
        }}
      />
      {errors?.password && (
        <Typography fontSize='small' color='error' textAlign='center'>
          {errors.password.message}
        </Typography>
      )}
    </>
  );
};

LoginContent.propTypes = {
  register: PropTypes.func.isRequired,
};

export default LoginContent;
