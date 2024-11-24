import React from "react";
import useServerApi from "../hooks/useServerApi";
import { useState } from "react";
import { useEffect } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [{ loading }, refresh] = useServerApi(
    { url: "/", method: "GET" },
    { manual: true }
  );
  useEffect(() => {
    refresh()
      .then((res) => {
        console.log(res);
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      {loading && <p>Loading...</p>}
      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ))}{" "}
    </div>
  );
};

export default Users;
