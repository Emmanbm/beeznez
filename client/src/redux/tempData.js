import { createSlice } from "@reduxjs/toolkit";

const tempData = createSlice({
  name: "tempData",
  initialState: {
    openNotifications: false,
    openSettings: false,
    openUpdateUser: false,
    formData: {
      userData: {},
      companyData: {},
    },
    modals: {
      projectDetails: {
        open: false,
        data: null,
      },
      formProject: {
        open: false,
        data: null,
      },
      modalUser: {
        open: false,
        data: null,
      },
      modalInfo: {
        open: true,
        data: null,
      },
    },
  },
  reducers: {
    toggleNotifications: (state) => {
      state.openNotifications = !state.openNotifications;
      state.openSettings = false;
      state.openUpdateUser = false;
    },
    toggleSettings: (state) => {
      const open = state.openSettings;
      if (open) {
        state.openSettings = false;
        state.openUpdateUser = false;
      } else {
        state.openSettings = true;
      }
      state.openNotifications = false;
    },
    toggleUpdateUser: (state) => {
      state.openUpdateUser = !state.openUpdateUser;
    },
    toggleAll: (state, action) => {
      const newState = action.payload;
      if (typeof newState === "boolean") {
        state.openNotifications = newState;
        state.openSettings = newState;
        state.openUpdateUser = newState;
      } else {
        state.openNotifications = !state.openNotifications;
        state.openSettings = !state.openSettings;
        state.openUpdateUser = !state.openUpdateUser;
      }
    },
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    updateUserData: (state, action) => {
      state.formData.userData = action.payload.userData;
    },
    updateCompanyData: (state, action) => {
      state.formData.companyData = action.payload.companyData;
    },
    openModal: (state, action) => {
      state.modals[action.payload.modal] = {
        open: true,
        data: action.payload.data,
      };
    },
    closeModal: (state, action) => {
      state.modals[action.payload.modal] = { open: false, data: null };
    },
  },
});

export const {
  toggleNotifications,
  toggleSettings,
  toggleUpdateUser,
  toggleAll,
  updateCompanyData,
  updateUserData,
  updateFormData,
  openModal,
  closeModal,
} = tempData.actions;

export default tempData.reducer;
