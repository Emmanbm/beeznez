import store from "../redux/store";
/**
 * Permet de déclencer un timeout pour déconnecter l'utilisateur
 * @param expirationTime - Le temps d'expiration
 */

export function setLogoutTimer(expirationTime: number): void {
  setTimeout(() => {
    console.log("Temps écoulé, l'utilisateur va être déconnecté");
    store.dispatch({ type: "user/logout" });
  }, expirationTime);
}
