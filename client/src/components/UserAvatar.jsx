import { Avatar } from "@mui/material";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

const UserAvatar = ({ size = 28 }) => {
  const { profilePicture, firstName, lastName } = useSelector(
    (store) => store.user || {}
  );
  const fullName = useMemo(
    () => `${firstName} ${lastName}`,
    [firstName, lastName]
  );
  return (
    <>
      {profilePicture ? (
        <Avatar
          alt={fullName}
          src={profilePicture}
          sx={{ height: size, width: size }}
        />
      ) : (
        <Avatar alt={fullName} sx={{ height: size, width: size }}>
          {fullName.toLocaleUpperCase()[0]}
        </Avatar>
      )}
    </>
  );
};

export default UserAvatar;
