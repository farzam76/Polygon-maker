import { createSlice } from "@reduxjs/toolkit";

export enum Theme {
  Dark = "dark",
  Light = "light",
}

export type GlobalInitialState = {
  theme: Theme;
  users: User[];
  projects: Project[];
};
const initialState: GlobalInitialState = {
  theme: Theme.Dark,
  users: [],
  projects: []
};

export const issueSlice = createSlice({
  name: "issue",
  initialState,
  reducers: {
    changeTheme(state) {
      state.theme = state.theme === Theme.Dark ? Theme.Light : Theme.Dark;
    },
    addGlobalUser(state, action) {
      state.users.push(action.payload);
    },
    updateGlobalUser(state, action) {
      state.users = state.users.map((user) => {
        if (user.id === action.payload.id) {
          return action.payload;
        }
        return user;
      });
    },
    addGlobalProject(state, action) {
      state.projects.push(action.payload);
    },
    updateGlobalProjects(state, action) {
      state.projects = action.payload;
    },

  },
});

export const { addGlobalUser,changeTheme,updateGlobalUser,updateGlobalProjects } = issueSlice.actions;
export default issueSlice.reducer;
