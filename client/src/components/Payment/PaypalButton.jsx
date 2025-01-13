import React, { useEffect } from "react";
import useServerApi from "../../hooks/useServerApi";
import { loadPayPalSdk } from "../../utils/loadPayPalSdk";

const PayPalButton = ({ payerId, recipientId, amount, onSuccess }) => {
  const [_, refresh] = useServerApi({ method: "POST" }, { manual: true });
  const getUrl = (path) => "/auth/payments/paypal/" + path;

  useEffect(() => {
    // Charger dynamiquement le SDK PayPal
    loadPayPalSdk()
      .then((paypal) => {
        paypal
          .Buttons({
            createOrder: async () => {
              try {
                const response = await refresh({
                  url: getUrl("create-order"),
                  headers: {
                    "Content-Type": "application/json",
                  },
                  data: { payerId, recipientId, amount },
                });
                const data = response.data;
                console.log("Create: ", { ...data, clientId });

                return data.orderId; // Retourner l'ID de commande
              } catch (error) {
                console.log(error);
              }
            },
            onApprove: async (data) => {
              console.log(("Approve: ", data));

              try {
                const response = await refresh({
                  url: getUrl("capture-order"),
                  headers: {
                    "Content-Type": "application/json",
                  },
                  data: { orderId: data.orderID },
                });
                const result = response.data;
                onSuccess(result); // Callback en cas de succès
              } catch (error) {
                console.log(error);
              }
            },
          })
          .render("#paypal-button-container");
      })
      .catch((err) => {
        console.error("Erreur lors du chargement du SDK PayPal :", err);
      });
  }, [amount, recipientId, onSuccess]);

  return <div id='paypal-button-container' />;
};

export default PayPalButton;
