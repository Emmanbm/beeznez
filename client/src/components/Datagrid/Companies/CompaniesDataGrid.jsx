import React, { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useServerApi from "../../../hooks/useServerApi";
import RenderDataGrid from "../RenderDataGrid";
import { getCompanies } from "../../../redux/user";
import { columns } from "./columns";

export default function CompaniesDataGrid() {
  const rows = useSelector((store) => store.user?.companies || []);
  const { role, companyId } = useSelector((store) => store.user || {});
  const dispatch = useDispatch();
  const requestRef = useRef("allowed");

  const [{ loading }, refresh] = useServerApi(
    { url: "/auth/companies" },
    { manual: true }
  );

  const fetchCompanies = async () => {
    try {
      const response = await refresh({ params: { role, companyId } });
      const companies = response.data;
      dispatch(getCompanies({ companies }));
      requestRef.current = "allowed";
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (requestRef.current === "allowed") {
      requestRef.current = "denied";
      if (role) {
        fetchCompanies();
      }
    }
  }, [role, companyId]);

  return <RenderDataGrid rows={rows} columns={columns} loading={loading} />;
}
