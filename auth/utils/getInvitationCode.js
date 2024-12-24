const crypto = require("crypto");

const getInvitationCode = () => {
  const invitationCode = crypto.randomBytes(8).toString("hex");
  return invitationCode;
};

module.exports = {
  getInvitationCode,
};
