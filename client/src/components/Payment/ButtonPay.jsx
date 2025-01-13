import React, { useEffect, useState } from "react";
import useServerApi from "../../hooks/useServerApi";
import LoadingButton from "../LoadingButton";
import PaymentIcon from "@mui/icons-material/Payment";
import { useSelector } from "react-redux";
import { loadPayPalSdk } from "../../utils/loadPayPalSdk";

const ButtonPay = ({
  recipientEmail,
  recipientId,
  amount,
  paymentMethod = "paypal",
}) => {
  const payerId = useSelector((store) => store.user.id);
  const [{ loading }, refresh] = useServerApi(
    {
      url: `/auth/payments/${paymentMethod}/create-order`,
      method: "POST",
      data: { payerId, recipientEmail, recipientId, amount },
    },
    { manual: true }
  );
  const handlePay = async () => {
    try {
      const response = await refresh();
      const data = response.data || {};
      const { approvalLink, error } = data;
      if (approvalLink) {
        window.open(approvalLink, "_blank");
      } else {
        console.log("Erreur lors de la création du paiement :", error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Chargement du SDK PayPal
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPayPalSdk()
      .then(() => {
        setPaypalLoaded(true);
        // console.log("SDK PayPal chargé avec succès.");
      })
      .catch((err) => {
        setError(err.message);
        console.error("Erreur lors du chargement du SDK PayPal :", err);
      });
  }, []);

  if (error) {
    return <LoadingButton disabled color='error' title='Erreur !' />;
  }

  if (!paypalLoaded) {
    return (
      <LoadingButton
        loading={!paypalLoaded}
        disabled
        title='Chargement de PayPal...'
      />
    );
  }
  return (
    <LoadingButton
      startIcon={<PaymentIcon />}
      variant='contained'
      loading={loading}
      size='small'
      disabled={!(recipientEmail || recipientId) || !amount || loading}
      onClick={handlePay}
      title={`Payer ${amount && amount.toFixed(2) + "€"}`}
    />
  );
};

export default ButtonPay;
