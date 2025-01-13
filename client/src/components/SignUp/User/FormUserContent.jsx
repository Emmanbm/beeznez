import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
// import PasswordField from "../../PasswordField";
import FormAlert from "../../FormAlert";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateFormData } from "../../../redux/tempData";
import useServerApi from "../../../hooks/useServerApi";
import LoadingButton from "../../LoadingButton";
import TextField from "../../FormFields/TextField";
import EmailField from "../../FormFields/EmailField";
import PasswordField from "../../FormFields/PasswordField";
import { login } from "../../../redux/user";

const FormUserContent = ({
  registerUserAndCompany = false,
  buttonTitle = "S'inscrire",
  width = "100vw",
  height = "100vh",
  handleNext,
  role = "freelance",
}) => {
  const isAuthenticated = useSelector((store) => store.user?.isAuthenticated);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const [{ loading, error }, refresh] = useServerApi(
    { url: "/auth/register", method: "POST" },
    { manual: true }
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password", "");

  const onSubmit = async (data) => {
    // console.log(data);
    try {
      if (registerUserAndCompany) {
        dispatch(updateFormData({ userData: data }));
        if (typeof handleNext === "function") {
          handleNext();
        }
      } else {
        const response = await refresh({ data: { ...data, role } });
        console.log(response);
        const { user } = response.data;
        if (user) {
          dispatch(login(user));
          navigateTo("/auth/dashboard");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  // if (isAuthenticated) return <Navigate to='/auth/dashboard' replace={true} />;
  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      height={height}
      width={width}
      display='flex'
      justifyContent='center'
      alignItems='center'>
      <Card sx={{ p: 2 }}>
        <CardHeader
          title='Inscription'
          subheader='Bienvenue, merci de vous inscrire pour continuer'
          titleTypographyProps={{
            fontWeight: "bold",
            color: "primary.main",
            textAlign: "center",
          }}
          subheaderTypographyProps={{
            color: "text.secondary",
            textAlign: "center",
            fontSize: "small",
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            maxWidth: "500px",
            flexDirection: "column",
            gap: 2,
          }}>
          <FormAlert error={error} />
          <TextField
            name='firstName'
            label='Prénom'
            placeholder='Votre prénom'
            register={register}
            apiErrors={error?.response?.data?.errors}
            formErrors={errors}
            required
          />
          <TextField
            name='lastName'
            label='Nom'
            placeholder='Votre nom'
            register={register}
            apiErrors={error?.response?.data?.errors}
            formErrors={errors}
            required
          />
          <EmailField
            register={register}
            formErrors={errors}
            apiErrors={error?.response?.data?.errors}
            required
          />
          {!registerUserAndCompany && (
            <TextField
              name='invitationCode'
              label="Code d'invitation (facultatif)"
              placeholder="Veuillez saisir le code d'invitation si vous en avez un"
              register={register}
              apiErrors={error?.response?.data?.errors}
              formErrors={errors}
            />
          )}

          <PasswordField
            id='password'
            displayStrength
            fullWidth
            formErrors={errors}
            apiErrors={error?.response?.data?.errors}
            required
            label='Mot de passe'
            variant='filled'
            placeholder='Mot de passe'
            name='password'
            FilledInputProps={{
              ...register("password", {
                required: "Le mot de passe est obligatoire",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!_@#$%^&*(),.?":{}|<>])[A-Za-z\d!_@#$%^&*(),.?":{}|<>]{8,}$/,
                  message:
                    'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial: [!_@#$%^&*(),.?":{}|<>]',
                },
              }),
            }}
          />
          <PasswordField
            id='confirm-password'
            fullWidth
            required
            formErrors={errors}
            apiErrors={error?.response?.data?.errors}
            label='Confirmer le mot de passe'
            variant='filled'
            placeholder='Confirmer le mot de passe'
            name='confirmPassword'
            FilledInputProps={{
              ...register("confirmPassword", {
                required: "La confirmation du mot de passe est obligatoire",
                validate: (value) =>
                  value === password ||
                  "Les mots de passe ne correspondent pas",
              }),
            }}
          />
        </CardContent>
        <CardActions sx={{ display: "flex", flexDirection: "column" }}>
          {!registerUserAndCompany && (
            <Stack direction='row' spacing={0.5} mb={1}>
              <Typography fontSize='small'>
                Vous avez déjà un compte ?
              </Typography>
              <Typography fontSize='small' component={Link} to='/login'>
                Se connecter
              </Typography>
            </Stack>
          )}
          <LoadingButton
            title={buttonTitle}
            loading={loading}
            type='submit'
            variant='contained'
            fullWidth
          />
        </CardActions>
      </Card>
    </Box>
  );
};

export default FormUserContent;
