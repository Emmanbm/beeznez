import React from "react";
import { Box, Button, CircularProgress } from "@mui/material";

const LoadingButton = ({ loading, title = "", ...props }) => {
  return (
    <Box sx={{ m: 1, position: "relative" }}>
      <Button {...props}>{title}</Button>
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </Box>
  );
};

export default LoadingButton;
