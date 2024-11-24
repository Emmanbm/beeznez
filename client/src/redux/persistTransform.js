// src/persistTransform.js
const EXPIRATION_TIME = 6 * 60 * 60 * 1000; // 6 heures en millisecondes

const expireTransform = {
  in: (inboundState, key) => {
    // Ajoute un timestamp à l'état lors de la sauvegarde
    return { ...inboundState, _persistedAt: Date.now() };
  },
  out: (outboundState, key) => {
    // Vérifie si l'état est expiré lors de la restauration
    if (
      !outboundState ||
      Date.now() - outboundState._persistedAt > EXPIRATION_TIME
    ) {
      return undefined; // Retourne undefined pour invalider l'état expiré
    }
    return outboundState;
  },
};

export default expireTransform;
