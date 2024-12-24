export const updateOptionsValues = ({
  firstName,
  lastName,
  email,
  role,
  profilePicture,
  phone,
  dateOfBirth,
}) => [
  { id: 1, name: "firstName", value: firstName, label: "Prénom" },
  { id: 2, name: "lastName", value: lastName, label: "Nom" },
  { id: 3, name: "email", value: email, label: "Email" },
  { id: 4, name: "role", value: role, label: "Rôle" },
  {
    id: 5,
    name: "profilePicture",
    value: profilePicture || "",
    label: "Photo de profil",
  },
  { id: 6, name: "phone", value: phone || "", label: "N° de téléphone" },
  {
    id: 7,
    name: "dateOfBirth",
    value: dateOfBirth || "",
    label: "Date de naissance",
  },
  { id: 8, name: "password", value: "", label: "Mot de passe" },
];
