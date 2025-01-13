import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { login } from "../redux/user";
import { useForm } from "react-hook-form";
import useServerApi from "../hooks/useServerApi";
import {
  Alert,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import Topbar from "../components/Topbar";
import LoadingButton from "../components/LoadingButton";
import LoginContent from "../components/Login/LoginContent";
import Footer from "../components/Footer";

const message = "Une erreur s’est produite, veuillez réessayer plus tard!";

const Login = () => {
  const isAuthenticated = useSelector((store) => store.user?.isAuthenticated);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigateTo = useNavigate();
  const [{ loading, error }, refresh] = useServerApi(
    { url: "/auth/login", method: "POST" },
    { manual: true }
  );
  const onSubmit = async (data) => {
    // console.log(data);
    try {
      const response = await refresh({ data });
      // console.log(response);
      const { user } = response.data;
      // console.log(user);
      if (user) {
        dispatch(login(user));
        navigateTo("/auth/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {isAuthenticated && <Navigate to='/auth/dashboard' replace={true} />}
      <Box
        width='100vw'
        height='100vh'
        display='flex'
        flexDirection='column'
        alignItems='center'>
        <Topbar />
        <Box
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          display='flex'
          flexDirection='column'
          flex={1}
          justifyContent='center'
          sx={{
            width: { xs: "100%", sm: "100%", md: 500 },
          }}>
          <Card elevation={2} sx={{ padding: 1, mx: { xs: 2, sm: 2 } }}>
            <CardHeader
              title='Se connecter'
              subheader='Ravi de vous revoir, merci de vous connecter pour continuer'
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
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {error && (
                <Alert severity='error'>
                  {error.response?.data?.message || message}
                </Alert>
              )}
              <LoginContent errors={errors} register={register} />
            </CardContent>
            <CardActions sx={{ display: "flex", flexDirection: "column" }}>
              <Stack direction='row' spacing={0.5} mb={1}>
                <Typography fontSize='small'>
                  Vous n'avez pas encore de compte ?
                </Typography>
                <Typography fontSize='small' component={Link} to='/signup'>
                  S'inscrire
                </Typography>
              </Stack>
              <LoadingButton
                title='Se connecter'
                loading={loading}
                variant='contained'
                type='submit'
              />
              <Typography fontSize='small' component={Link} to='#'>
                Mot de passe oublié
              </Typography>
            </CardActions>
          </Card>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default Login;
