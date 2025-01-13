import React, { useEffect, useMemo, useRef } from "react";
import { columns } from "./columns";
import RenderDataGrid from "../RenderDataGrid";
import { useTheme } from "@mui/material";
import { green, grey, red, yellow } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import useServerApi from "../../../hooks/useServerApi";
import { getPayments } from "../../../redux/user";

export default function PaymentsDataGrid() {
  const rows = useSelector((store) => store.user?.payments || paymentData);
  const userId = useSelector((store) => store.user?.id);
  const theme = useTheme();
  const nuance = useMemo(
    () => (theme.palette.mode === "light" ? 300 : 500),
    [theme.palette.mode]
  );
  const rowColors = {
    success: green[nuance],
    failed: red[nuance],
    pending: yellow[nuance],
    cancelled: grey[nuance],
  };

  const dispatch = useDispatch();
  const requestRef = useRef("allowed");
  const [{ loading }, refresh] = useServerApi(
    { url: `/auth/payments/${userId}` },
    { manual: true }
  );
  const fetchPayments = async () => {
    try {
      const response = await refresh();
      const data = response.data;
      const payments = data?.map(
        ({ id, payerId, recipientId, amount, currency, status, createdAt }) => {
          return {
            id,
            amount,
            currency,
            status,
            createdAt,
            payer: `${payerId.firstName} ${payerId.lastName}`,
            recipient: `${recipientId.firstName} ${recipientId.lastName}`,
          };
        }
      );
      dispatch(getPayments({ payments }));
      requestRef.current = "allowed";
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (requestRef.current === "allowed") {
      requestRef.current = "denied";
      if (userId) {
        fetchPayments();
      }
    }
  }, [userId]);

  return (
    <RenderDataGrid
      rows={rows}
      columns={columns}
      loading={loading}
      getRowClassName={(params) => {
        switch (params.row.status) {
          case "success":
          case "completed":
            return "row-success";
          case "failed":
            return "row-failed";
          case "pending":
            return "row-pending";
          case "cancelled":
            return "row-cancelled";
          default:
            return "";
        }
      }}
      sx={{
        "& .row-success": {
          backgroundColor: rowColors.success,
          color: theme.palette.getContrastText(rowColors.success),
        },
        "& .row-failed": {
          backgroundColor: rowColors.failed,
          color: theme.palette.getContrastText(rowColors.failed),
        },
        "& .row-pending": {
          backgroundColor: rowColors.pending,
          color: theme.palette.getContrastText(rowColors.pending),
        },
        "& .row-cancelled": {
          backgroundColor: rowColors.cancelled,
          color: theme.palette.getContrastText(rowColors.cancelled),
        },
      }}
    />
  );
}
