import { Box } from "@mui/material";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

const CompanyLogo = ({ row: data, ...otherProps }) => {
  const companies = useSelector((store) => store.user?.companies || []);
  const company = useMemo(
    () => companies.find((c) => c.id === data?.id),
    [companies]
  );
  return <Box component='img' src={company.logo} width={20} />;
};

export default CompanyLogo;
