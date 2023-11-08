// create and authentocation reducer with username and password and loggedIn state
import { createSlice } from "@reduxjs/toolkit";



export type AuthenticationInitialState = {
  isLoggedIn: boolean;
  userData: User;
};
const initialState: AuthenticationInitialState = {
    isLoggedIn: false,
    userData: {
        id: "",
        username: "",
        password: "",
        projectIds: []
    },
};

export const AuthenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    updateIsLoggedIn(state, action) {
        state.isLoggedIn = action.payload;
        },
        updateUserData(state, action) {
            state.userData = action.payload;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.userData = {
                id: "",
                username: "",
                password: "",
                projectIds: []
            }
        },
        login(state, action) {            
            state.isLoggedIn = true;
            state.userData = action.payload;
        },
        signup(state, action) {
            state.isLoggedIn = true;
            state.userData = action.payload;
        }
  },
});

export const { updateIsLoggedIn ,updateUserData, logout,login,signup  } = AuthenticationSlice.actions;
export default AuthenticationSlice.reducer;
