import React, { useEffect, useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import FormUserContent from "../components/SignUp/User/FormUserContent";
import FormCompanyContent from "../components/SignUp/Company/FormCompanyContent";
import { useDispatch, useSelector } from "react-redux";
import useServerApi from "../hooks/useServerApi";
import LoadingButton from "../components/LoadingButton";
import { useNavigate } from "react-router-dom";
import FormModalError from "../components/FormModalError";
import { login } from "../redux/user";

const steps = ["Créer un compte utilisateur", "Créer un compte entreprise"];
const buttonTitle = "Continuer";

const RegisterUserAndCompany = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const formData = useSelector((store) => store.tempData?.formData);
  const [{ loading, error }, refresh] = useServerApi(
    { url: "auth/register/company/and/manager", method: "POST" },
    { manual: true }
  );
  const navigateTo = useNavigate();

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    try {
      console.log(formData);

      const response = await refresh({ data: formData });
      console.log(response);
      const { user } = response.data;
      if (user) {
        dispatch(login(user));
        navigateTo("/auth/dashboard");
      }
      // navigateTo("/login");
    } catch (error) {
      setOpenModal(true);
      console.log(error);
    }
  };

  return (
    <Box
      width='100vw'
      height='100vh'
      padding={1}
      display='flex'
      flexDirection='column'
      gap={2}
      alignItems='center'
      justifyContent={activeStep !== steps.length ? "space-between" : "center"}>
      <ModalError open={openModal} setOpen={setOpenModal} error={error} />
      <Stepper activeStep={activeStep} alternativeLabel sx={{ width: "100%" }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <FormUserContent
          width='100%'
          height='100%'
          buttonTitle={buttonTitle}
          registerUserAndCompany
          handleNext={handleNext}
        />
      )}

      {activeStep === 1 && (
        <FormCompanyContent
          width='100%'
          height='100%'
          buttonTitle={buttonTitle}
          registerUserAndCompany
          handleNext={handleNext}
        />
      )}

      {activeStep === steps.length ? (
        <Stack alignItems='center' spacing={2}>
          <Typography textAlign='center'>
            Merci! Vous pouvez maintenant soumettre votre inscription.
          </Typography>
          <LoadingButton
            title='Soumettre'
            onClick={handleSubmit}
            loading={loading}
            variant='contained'
            fullWidth
          />
          <Button onClick={() => setActiveStep(0)}>Annuler</Button>
        </Stack>
      ) : (
        <Stack direction='row' spacing={1}>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Retour
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default RegisterUserAndCompany;
