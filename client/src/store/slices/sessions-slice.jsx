import { createSlice } from "@reduxjs/toolkit";

const sessionsInititalState = {
  sessionsList: [],
  detailSession: {},
};

const sessionsSlice = createSlice({
  name: "sessions",
  initialState: sessionsInititalState,
  reducers: {
    setSessions(state, action) {
      state.sessionsList = action.payload;
    },
    setDetailSession(state, action) {
      state.detailSession = action.payload;
    },
  },
});

export const sessionsActions = sessionsSlice.actions;

export default sessionsSlice.reducer;
