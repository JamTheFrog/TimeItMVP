import { createSlice } from "@reduxjs/toolkit";

const existingToken = localStorage.getItem("token");

const authInititalState = {
  token: !existingToken ? null : existingToken,
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInititalState,
  reducers: {
    setToken(state, action) {
      const existingToken = localStorage.getItem("token");
      if (existingToken !== action.payload) {
        localStorage.setItem("token", action.payload);
      }
      state.token = action.payload;
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
