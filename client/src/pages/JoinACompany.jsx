import {
  Alert,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "../components/LoadingButton";
import useServerApi from "../hooks/useServerApi";
import { useDispatch, useSelector } from "react-redux";

const JoinACompany = () => {
  const userId = useSelector((store) => store.user.id);
  const dispatch = useDispatch();
  const [{ loading }, refresh] = useServerApi(
    { url: "/auth/join/company", method: "POST" },
    { manual: true }
  );
  const [invitationCode, setInvitationCode] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const handleAlert = ({ message, type }) => {
    setMessage(message);
    setType(type);
  };
  const handleClick = async () => {
    try {
      const response = await refresh({ data: { invitationCode, userId } });
      const message =
        response.data.message ||
        "Vous avez été ajouté avec succès à l'entreprise.";
      handleAlert({
        message:
          message + " Vous allez être déconnecté, veuillez vous reconnecter.",
        type: "success",
      });
    } catch (error) {
      console.log("Erreur lors de la récupération des données : ", error);
      const message =
        error.response?.data?.error ||
        "Le code d'invitation est incorrect ou invalide.";
      handleAlert({ message, type: "error" });
    }
    setInvitationCode("");
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };
  return (
    <Box
      width='100%'
      height='100%'
      display='flex'
      alignItems='center'
      justifyContent='center'>
      <Card>
        <CardHeader
          title="Vous allez rejoindre une entreprise en tant qu'employé ?"
          titleTypographyProps={{
            fontWeight: "bold",
            color: "primary.main",
            fontSize: { xs: "medium", md: "large" },
            textAlign: { xs: "center", md: "auto" },
          }}
          subheader="Veuillez saisir le code d'invitation de l'entreprise que vous souhaitez rejoindre."
          subheaderTypographyProps={{
            color: "text.secondary",
            fontSize: "small",
            textAlign: { xs: "center", md: "auto" },
          }}
        />
        {type === "success" ? (
          <LoadingButton
            title='Veuillez vous reconnecter pour prendre les modifications en compte'
            onClick={() => dispatch({ type: "user/logout" })}
          />
        ) : (
          <>
            <CardContent>
              {message && type && (
                <Alert severity={type} sx={{ mb: 2 }}>
                  {message}
                </Alert>
              )}
              <TextField
                label="Code d'invitation"
                name='invitationCode'
                id='invitationCode'
                fullWidth
                size='small'
                value={invitationCode}
                onChange={(e) => setInvitationCode(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "center" }}>
              <LoadingButton
                loading={loading}
                title='Valider'
                variant='contained'
                size='small'
                disabled={!invitationCode}
                endIcon={<SendIcon />}
                onClick={handleClick}
              />
            </CardActions>
          </>
        )}
      </Card>
    </Box>
  );
};

export default JoinACompany;
