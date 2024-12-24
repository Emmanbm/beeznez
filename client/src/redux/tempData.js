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
  },
  reducers: {
    toggleNotifications: (state) => {
      state.openNotifications = !state.openNotifications;
    },
    toggleSettings: (state) => {
      state.openSettings = !state.openSettings;
    },
    toggleUpdateUser: (state) => {
      state.openUpdateUser = !state.openUpdateUser;
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
  },
});

export const {
  toggleNotifications,
  toggleSettings,
  toggleUpdateUser,
  updateCompanyData,
  updateUserData,
  updateFormData,
} = tempData.actions;

export default tempData.reducer;
