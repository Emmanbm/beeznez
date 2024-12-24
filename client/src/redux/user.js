import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  profilePicture: "",
  companyId: "",
  isAuthenticated: false,
  notifications: [],
  users: [],
  tasks: [],
  projects: [],
  companies: [],
  elapsedTime: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      Object.assign(state, action.payload);
      state.isAuthenticated = true;
      state.elapsedTime = Date.now();
    },
    logout: (state) => {
      Object.assign(state, initialState);
    },
    readNotification: (state, action) => {
      state.notifications = state.notifications.map((notif) =>
        notif._id === action.payload._id
          ? { ...notif, isRead: true }
          : { ...notif }
      );
    },
    updateConnectedUser: (state, action) => {
      Object.assign(state, action.payload);
      state.elapsedTime = Date.now();
    },
    getUsers: (state, action) => {
      state.users = action.payload.users;
    },
    editUser: (state, action) => {
      const currentUser = action.payload.user;
      state.users = state.users.map((user) =>
        user.id === currentUser.id ? { ...currentUser } : { ...user }
      );
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload.id);
    },
    getTasks: (state, action) => {
      state.tasks = action.payload.tasks;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload.task);
    },
    updateTask: (state, action) => {
      const { updatedTask } = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === updatedTask.id ? { ...updatedTask } : { ...task }
      );
    },
    deleteTask: (state, action) => {
      const { deletedTask } = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== deletedTask.id);
    },
    getProjects: (state, action) => {
      state.projects = action.payload.projects;
    },
    addProject: (state, action) => {
      state.projects.push(action.payload.project);
    },
    updateProject: (state, action) => {
      const { updatedProject } = action.payload;
      state.projects = state.projects.map((project) =>
        project.id === updatedProject.id
          ? { ...updatedProject }
          : { ...project }
      );
    },
    deleteProject: (state, action) => {
      const { deletedProject } = action.payload;
      state.projects = state.projects.filter(
        (project) => project.id !== deletedProject.id
      );
    },
    getCompanies: (state, action) => {
      state.companies = action.payload.companies;
    },
  },
});

export const {
  login,
  logout,
  updateConnectedUser,
  readNotification,
  deleteUser,
  editUser,
  getUsers,
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  getCompanies,
} = userSlice.actions;

export default userSlice.reducer;
