import { Grid, TextField } from "@mui/material";
import React from "react";

const CustomTextField = ({
  name,
  label,
  register,
  required,
  ...otherProps
}) => {
  return (
    <Grid
      item
      xs={12} // Chaque grille occupe toute la largeur (1 ligne) sur les écrans très petits
      sm={6} // Chaque grille occupe 50% (2 colonnes) sur les écrans petits
      md={4} // Chaque grille occupe 33.33% (3 colonnes) sur les écrans moyens
      lg={2} // Chaque grille occupe 16.66% (6 colonnes) sur les grands écrans
    >
      <TextField
        fullWidth
        label={label}
        name={name}
        {...register(name)}
        required={required}
        size='small'
        {...otherProps}
      />
    </Grid>
  );
};

export default CustomTextField;
