export const loadPayPalSdk = (currency = "EUR") => {
  const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
  return new Promise((resolve, reject) => {
    if (document.getElementById("paypal-sdk") || window.paypal) {
      resolve(window.paypal); // SDK déjà chargé
      return;
    }

    // Créer le script PayPal
    const script = document.createElement("script");
    script.id = "paypal-sdk";
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}&components=buttons,applepay,marks,messages`;
    script.async = true;
    script.nonce = "random_nonce_value";
    script.onload = () => {
      if (window.paypal) {
        resolve(window.paypal);
      } else {
        reject(new Error("SDK PayPal non chargé correctement."));
      }
    };
    script.onerror = () =>
      reject(new Error("Erreur lors du chargement du SDK PayPal."));

    // Ajouter le script au document
    document.head.appendChild(script);
  });
};
