/**
 * Évalue la robustesse d'un mot de passe.
 * @param password - Le mot de passe à évaluer.
 * @returns Un score entre 0 et 5.
 */
export const getPasswordStrength = (password: string): number => {
  let score = 0;

  if (password.length >= 8) score++; // Minimum 8 caractères
  if (password.length >= 12) score++; // Minimum 12 caractères
  if (/[A-Z]/.test(password)) score++; // Contient une majuscule
  if (/[a-z]/.test(password)) score++; // Contient une minuscule
  if (/\d/.test(password)) score++; // Contient un chiffre
  if (/[!_@#$%^&*(),.?":{}|<>]/.test(password)) score++; // Contient un caractère spécial

  return score; // Retourne un score entre 0 et 5
};
