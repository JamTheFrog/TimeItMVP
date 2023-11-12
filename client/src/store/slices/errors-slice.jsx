import { createSlice } from "@reduxjs/toolkit";

const errorsInititalState = {
  errors: [],
};

const errorsSlice = createSlice({
  name: "errors",
  initialState: errorsInititalState,
  reducers: {
    setErrors(state, action) {
      state.errors = action.payload;
    },
  },
});

export const errorsActions = errorsSlice.actions;

export default errorsSlice.reducer;
