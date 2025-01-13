import React, { useEffect, useRef } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import useServerApi from "../hooks/useServerApi";
import ModalInfo from "../components/ModalInfo";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { openModal } from "../redux/tempData";

const PaymentResult = () => {
  const { result, paymentMethod } = useParams();
  const [searchParams] = useSearchParams();
  const [{ loading }, refresh] = useServerApi(
    {
      url: `/auth/payments/${paymentMethod}/capture-order`,
      method: "POST",
    },
    { manual: true }
  );
  const dispatch = useDispatch();
  const handleOpenModal = (message, type) => {
    dispatch(openModal({ modal: "modalInfo", data: { message, type } }));
  };
  useEffect(() => {
    if (result === "success") {
      const capturePayment = async () => {
        const orderId = searchParams.get("token"); // Récupérer orderId depuis l'URL
        try {
          const response = await refresh({ data: { orderId } });
          const data = response.data || {};
          const message = data?.message || "Paiement effectué avec succès !";
          console.log("Paiement capturé :", data);
          handleOpenModal(message, "success");
        } catch (err) {
          console.log("Erreur lors de la capture du paiement :", err);
          const message = err?.response?.data?.error || "Paiement échoué";
          handleOpenModal(message, "error");
        }
      };
      capturePayment();
    }
    if (result === "cancel") {
      handleOpenModal("Paiement annulé !", "info");
    }
  }, [searchParams]);

  if (loading) {
    return <Typography variant='h6'>Paiement en cours...</Typography>;
  }

  return (
    <>
      {!loading && <ModalInfo />}
      <Typography variant='h6'>
        Vous pouvez retourner sur la <Link to='/auth/dashboard'>Dashboard</Link>
        .
      </Typography>
    </>
  );
};

export default PaymentResult;
