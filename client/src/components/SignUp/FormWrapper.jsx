import React from "react";
import { Box, Card, CardHeader, CardContent, CardActions } from "@mui/material";
import LoadingButton from "../LoadingButton";

const FormWrapper = ({ title, subheader, children, onSubmit, loading }) => (
  <Box
    component='form'
    onSubmit={onSubmit}
    display='flex'
    justifyContent='center'
    alignItems='center'
    height='100%'
    width='100%'>
    <Card sx={{ p: 2 }}>
      <CardHeader
        title={title}
        subheader={subheader}
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
        {children}
      </CardContent>
      <CardActions sx={{ display: "flex", flexDirection: "column" }}>
        <LoadingButton
          loading={loading}
          type='submit'
          variant='contained'
          fullWidth>
          Soumettre
        </LoadingButton>
      </CardActions>
    </Card>
  </Box>
);

export default FormWrapper;
