const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../swagger/auth.json");
// const swaggerSpec = swaggerJsDoc(options);
const servers = [
  {
    url: "https://backend.beeznez.fr/api/auth",
    description: "Serveur Auth en production",
  },
];
if (process.env.NODE_ENV === "development") {
  servers.unshift({
    url: "http://localhost:3000/api/auth",
    description: "Serveur Auth en développement",
  });
  console.log("Serveur Auth en développement activé");
}

swaggerSpec.servers = servers;
// console.log(JSON.stringify(swaggerSpec, null, 2));

module.exports = { swaggerUi, swaggerSpec };
