import { AccordionActions, AccordionDetails, TextField } from "@mui/material";
import React, { useState } from "react";
import ButtonPay from "../../../Payment/ButtonPay";

const PayUser = ({ user }) => {
  const [amount, setAmount] = useState("");
  const handleChange = (event) => {
    const value = event.target.value;
    try {
      setAmount(Number(value > 0 ? value : 0));
    } catch (error) {
      console.log(error);
      setAmount(0);
    }
  };
  return (
    <>
      <AccordionDetails>
        <TextField
          fullWidth
          label='Montant'
          type='number'
          value={amount}
          onChange={handleChange}
        />
      </AccordionDetails>
      {user?.email && (
        <AccordionActions>
          <ButtonPay recipientEmail={user.email} amount={amount} />
        </AccordionActions>
      )}
    </>
  );
};

export default PayUser;
