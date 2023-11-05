import { createSlice } from "@reduxjs/toolkit";

export enum Theme {
  Dark = "dark",
  Light = "light",
}

export type GlobalInitialState = {
  theme: Theme;
};
const initialState: GlobalInitialState = {
  theme: Theme.Dark,
};

export const issueSlice = createSlice({
  name: "issue",
  initialState,
  reducers: {
    changeTheme(state) {
      state.theme = state.theme === Theme.Dark ? Theme.Light : Theme.Dark;
    },
  },
});

export const { changeTheme } = issueSlice.actions;
export default issueSlice.reducer;
