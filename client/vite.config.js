import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Permet d'exposer des variables globales dans les tests
    environment: "jsdom",
    setupFiles: "./tests/setupTests.js", // Charge le fichier de test de configuration
  },
  server: {
    host: "0.0.0.0", // Autorise les connexions depuis l'extérieur
    port: 5173, // Assure-toi que le port est le bon
  },
});
