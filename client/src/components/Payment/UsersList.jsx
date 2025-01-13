import React from "react";
import { useSelector } from "react-redux";
import User from "./User";

const UsersList = () => {
  const users = useSelector((store) => store.user?.users || []);
  return (
    <>
      {users.map((user) => (
        <User key={user?.id} user={user} />
      ))}
    </>
  );
};

export default UsersList;
