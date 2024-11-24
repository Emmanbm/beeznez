import { createSlice } from "@reduxjs/toolkit";

const EXPIRATION_TIME = 6 * 1000; // 6 secondes en millisecondes
// const EXPIRATION_TIME = 6 * 60 * 60 * 1000; // 6 heures en millisecondes

const user = createSlice({
  name: "user",
  initialState: {
    id: null,
    name: null,
    email: null,
    role: null,
    isAuthenticated: false,
  },
  reducers: {
    login: (state, action) => {
      const userData = {
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        role: action.payload.role,
        isAuthenticated: true,
        timestamp: Date.now(), // Enregistre l'heure de connexion
      };

      // Met à jour l'état Redux
      Object.assign(state, userData);

      // Sauvegarde les données dans localStorage
      localStorage.setItem("__BEEZNEZ_USER__", JSON.stringify(userData));
    },
    logout: (state) => {
      // Réinitialise l'état Redux
      state.id = null;
      state.name = null;
      state.email = null;
      state.role = null;
      state.isAuthenticated = false;

      // Supprime les données du localStorage
      localStorage.removeItem("__BEEZNEZ_USER__");
    },
    checkSession: (state) => {
      const storedUser = JSON.parse(localStorage.getItem("__BEEZNEZ_USER__"));

      if (storedUser) {
        const isExpired = Date.now() - storedUser.timestamp > EXPIRATION_TIME;

        if (isExpired) {
          // Si expiré, déconnecte l'utilisateur
          localStorage.removeItem("__BEEZNEZ_USER__");
          state.id = null;
          state.name = null;
          state.email = null;
          state.role = null;
          state.isAuthenticated = false;
        } else {
          // Sinon, restaure l'utilisateur
          Object.assign(state, storedUser);
        }
      }
    },
  },
});

export const { login, logout, checkSession } = user.actions;

export default user.reducer;
