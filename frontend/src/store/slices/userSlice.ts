import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    name: "",
    email: "",
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            //fetch the user data from the backend and set it in the state
            state.isLoggedIn = true;
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
        logoutUser: (state) => {
            //remove the user data from the state by fetch the backend
            // localStorage.removeItem("itineraries");
            // localStorage.removeItem("places");
            state.isLoggedIn = false;
            state.name = "";
            state.email = "";
        },
    },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;

