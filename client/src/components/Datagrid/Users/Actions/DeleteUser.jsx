import {
  AccordionActions,
  AccordionDetails,
  Button,
  Typography,
} from "@mui/material";
import React from "react";

const DeleteUser = ({ user }) => {
  return (
    <>
      <AccordionDetails>
        <Typography variant='subtitle1'>
          Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est
          irreversible.
        </Typography>
      </AccordionDetails>
      <AccordionActions>
        <Button color='error' size='small' variant='contained'>
          Supprimer
        </Button>
      </AccordionActions>
    </>
  );
};

export default DeleteUser;
