import axios from "axios";
import store from "../redux/store";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 5000,
  responseEncoding: "utf8",
  responseType: "json",
  maxContentLength: 4000,
  proxy: {
    protocol: import.meta.env.DEV ? "http" : "https",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Vérifier si l'erreur est une expiration de token
    if (error.response?.status === 401) {
      store.dispatch({ type: "user/logout" }); // Réinitialise les informations de l'utilisateur
    }
    // Rejeter toutes les autres erreurs
    return Promise.reject(error);
  }
);

export default axiosInstance;
