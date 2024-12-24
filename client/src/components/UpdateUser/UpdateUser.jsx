import { Box, Button, Drawer, Toolbar } from "@mui/material";
import React, { useMemo } from "react";
// import { updateOptions } from "./updateOptions";
import CustomEditComponent from "./CustomEditComponent";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { updateOptionsValues } from "./updateOptions";

const UpdateUser = () => {
  const open = useSelector((store) => store.tempData?.openUpdateUser);
  const {
    firstName,
    lastName,
    email,
    role,
    profilePicture,
    phone,
    dateOfBirth,
  } = useSelector((store) => store.user || {});
  const dispatch = useDispatch();
  const updateOptions = useMemo(() => {
    return updateOptionsValues({
      firstName,
      lastName,
      email,
      role,
      profilePicture,
      phone,
      dateOfBirth,
    });
  }, [firstName, lastName, email, role]);
  return (
    <Drawer variant='persistent' anchor='right' open={open}>
      <Toolbar />
      <Box
        padding={1}
        display='flex'
        flexDirection='column'
        gap={1}
        sx={{ width: { xs: "100vw", sm: "100vw", md: "25vw" } }}>
        <Button
          color='inherit'
          startIcon={<ArrowBackIcon />}
          onClick={() => dispatch({ type: "tempData/toggleUpdateUser" })}
          sx={{ width: "max-content" }}>
          Paramètres du compte
        </Button>
        {updateOptions
          ?.filter(
            ({ name, value }) =>
              name !== "role" ||
              (name === "role" && ["admin", "manager"].includes(value))
          )
          .map(({ id, name, value, label }) => (
            <CustomEditComponent
              key={id}
              name={name}
              value={value}
              label={label}
            />
          ))}
      </Box>
    </Drawer>
  );
};

export default UpdateUser;
