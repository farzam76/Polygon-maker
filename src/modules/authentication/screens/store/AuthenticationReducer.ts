// create and authentocation reducer with username and password and loggedIn state
import { createSlice } from "@reduxjs/toolkit";



export type AuthenticationInitialState = {
  isLoggedIn: boolean;
  userData: User;
  users: User[];
};
const initialState: AuthenticationInitialState = {
    isLoggedIn: false,
    userData: {
        id: "",
        username: "",
        password: ""
    },
    users:[]
};

export const AuthenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    updateIsLoggedIn(state, action) {
        state.isLoggedIn = action.payload;
        },
        updateUser(state, action) {
            state.userData = action.payload;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.userData = {
                id: "",
                username: "",
                password: ""
            }
        },
        login(state, action) {
            state.users.find(user => user.id === action.payload.id);
            
            state.isLoggedIn = true;
            state.userData = action.payload;
        },
        signup(state, action) {
            state.isLoggedIn = true;
            state.users.push(action.payload);
            state.userData = action.payload;
        }
  },
});

export const { updateIsLoggedIn ,updateUser, logout,login,signup  } = AuthenticationSlice.actions;
export default AuthenticationSlice.reducer;
