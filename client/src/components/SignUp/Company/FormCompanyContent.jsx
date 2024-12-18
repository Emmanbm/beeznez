import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "@mui/material";
import React from "react";
import CustomTextField from "../../CustomTextField";
import FormAlert from "../../FormAlert";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import useServerApi from "../../../hooks/useServerApi";
import { updateCompanyData, updateFormData } from "../../../redux/tempData";
import LoadingButton from "../../LoadingButton";
import AddressField from "../../FormFields/AddressField";

const FormCompanyContent = ({
  registerUserAndCompany = false,
  buttonTitle = "Valider",
  width = "100vw",
  height = "100vh",
  handleNext,
}) => {
  const isAuthenticated = useSelector((store) => store.user?.isAuthenticated);
  const dispatch = useDispatch();
  const [{ loading, error }, refresh] = useServerApi(
    { url: "/register/company", method: "POST" },
    { manual: true }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    try {
      if (registerUserAndCompany) {
        dispatch(updateFormData({ companyData: data }));
        if (typeof handleNext === "function") {
          handleNext();
        }
      } else {
        const response = await refresh({ data });
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (isAuthenticated) return <Navigate to='/auth/dashboard' replace={true} />;
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
          title='Créer une entreprise'
          subheader='Bienvenue, merci de remplir ce formulaire pour continuer'
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
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <FormAlert error={error} />
          <CustomTextField
            register={register}
            name='name'
            label="Nom de l'entreprise"
            placeholder="Nom de l'entreprise"
          />
          <CustomTextField
            register={register}
            name='email'
            label='Adresse e-mail'
            placeholder='contact@beeznez.com'
          />
          <CustomTextField
            register={register}
            name='phone'
            label='Téléphone'
            placeholder="Numéro de l'entreprise"
            required={false}
          />
          {/* <CustomTextField
            register={register}
            name='address'
            label='Adresse postale'
            placeholder="Adresse postale de l'entreprise"
            required={false}
          /> */}
          <CustomTextField
            register={register}
            name='website'
            label="Site web de l'entreprise"
            placeholder="Site web de l'entreprise"
            required={false}
          />
        </CardContent>
        <CardActions sx={{ display: "flex", flexDirection: "column" }}>
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

export default FormCompanyContent;
