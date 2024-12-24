import React from "react";
import FormUserContent from "../../components/SignUp/User/FormUserContent";

const CreateAdmin = () => {
  return (
    <FormUserContent
      buttonTitle='Créer'
      role='admin'
      width='100%'
      height='100%'
    />
  );
};

export default CreateAdmin;
