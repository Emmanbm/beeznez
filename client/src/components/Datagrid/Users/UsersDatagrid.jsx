import React, { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { columns } from "./columns";
import useServerApi from "../../../hooks/useServerApi";
import { getUsers } from "../../../redux/user";
import RenderDataGrid from "../RenderDataGrid";

export default function UsersDatagrid() {
  const rows = useSelector((store) => store.user?.users || []);
  const { role, companyId } = useSelector((store) => store.user || {});
  const dispatch = useDispatch();
  const requestRef = useRef("allowed");

  const [{ loading }, refresh] = useServerApi(
    { url: "/auth/users" },
    { manual: true }
  );

  const fetchUsers = async () => {
    try {
      const response = await refresh({ params: { role, companyId } });
      const users = response.data;
      dispatch(getUsers({ users }));
      requestRef.current = "allowed";
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (requestRef.current === "allowed") {
      requestRef.current = "denied";
      if (role) {
        fetchUsers();
      }
    }
  }, [role, companyId]);

  return <RenderDataGrid rows={rows} columns={columns} loading={loading} />;
}
