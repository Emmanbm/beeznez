import { Checkbox } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../../../redux/user";
import useServerApi from "../../../hooks/useServerApi";

const CustomCheckbox = ({ row }) => {
  useEffect(() => {
    console.log(row);
  }, []);

  const [{}, refresh] = useServerApi(
    { url: `/auth/task/${row.id}`, method: "put" },
    { manual: true }
  );
  const dispatch = useDispatch();
  const onChange = async (e) => {
    try {
      console.log(e.target.checked);
      console.log(row);
      const data = { ...row };
      const response = await refresh({ data });
      const updatedTask = response.data;
      console.log("updatedTask: ", updatedTask);
      dispatch(updateTask(updatedTask));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Checkbox
      value={row.completed}
      // checked={row.completed}
      onChange={onChange}
      color='success'
    />
  );
};

export default CustomCheckbox;
