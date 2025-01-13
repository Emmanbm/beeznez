import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  TextField,
  Button,
  Alert,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useServerApi from "../hooks/useServerApi";
import LoadingButton from "./LoadingButton";
import SendIcon from "@mui/icons-material/Send";

export default function ContactForm() {
  const [resultMessage, setResultMessage] = useState("");
  const [type, setType] = useState("");
  const email = useSelector((store) => store.user?.email || "");
  const [{ loading }, refresh] = useServerApi(
    {
      url: "/auth/notifications/admin",
      method: "POST",
    },
    { manual: true }
  );
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email,
      title: "Contacter le service client BeeZnez",
      message: "",
    },
  });

  const onSubmit = async (values) => {
    const data = {
      title: `${values.title} (${values.email})`,
      message: `${values.name} a écrit: ${values.message}`,
    };
    try {
      const response = await refresh({ data });
      const message =
        response.data.message ||
        "Votre message a bien été envoyé au service technique de BeeZnez.";
      setResultMessage(message);
      setType("success");
      reset();
    } catch (error) {
      console.log("Form Data:", values);
      console.log("Erreur lors de l'envoi du message : ", error);
      const message =
        error.response?.data?.message || "Une erreur s'est produite";
      setResultMessage(message);
      setType("error");
    }
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 500,
        p: 3,
        borderRadius: 2,
      }}>
      <Card>
        <CardHeader
          title='Veuillez remplir ce formulaire de contact'
          titleTypographyProps={{
            fontWeight: "bold",
            // color: "primary.main",
            textAlign: "center",
          }}
        />
        <CardContent>
          <Alert severity={type} sx={{ mb: 2 }}>
            <Typography>{resultMessage}</Typography>
            {type === "success" && (
              <Link to='/'>Retourner à la page d'acceuil</Link>
            )}
          </Alert>

          <Controller
            name='name'
            control={control}
            rules={{ required: "Le nom est requis." }}
            render={({ field }) => (
              <TextField
                {...field}
                size={"small"}
                label='Nom'
                variant='outlined'
                fullWidth
                margin='normal'
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />

          <Controller
            name='email'
            control={control}
            rules={{
              required: "L'e-mail est requis.",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Veuillez entrer une adresse e-mail valide.",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                size={"small"}
                label='E-mail'
                variant='outlined'
                fullWidth
                margin='normal'
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          <Controller
            name='title'
            control={control}
            rules={{ required: "Le titre est requis." }}
            render={({ field }) => (
              <TextField
                {...field}
                size={"small"}
                label='Titre du message'
                variant='outlined'
                fullWidth
                margin='normal'
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />

          <Controller
            name='message'
            control={control}
            rules={{ required: "Le message est requis." }}
            render={({ field }) => (
              <TextField
                {...field}
                size={"small"}
                label='Message'
                variant='outlined'
                fullWidth
                margin='normal'
                multiline
                rows={4}
                error={!!errors.message}
                helperText={errors.message?.message}
              />
            )}
          />
        </CardContent>
        <CardActions>
          <LoadingButton
            loading={loading}
            title='Envoyer'
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
            sx={{ my: 2 }}
            endIcon={<SendIcon />}
          />
        </CardActions>
      </Card>
      {/* <Typography variant='h6' sx={{ mb: 3, textAlign: "center" }}>
        Veuillez remplir ce formulaire de contact
      </Typography> */}
    </Box>
  );
}
