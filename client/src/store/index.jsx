import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import errorsReducer from "./slices/errors-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    errors: errorsReducer,
  },
});

export default store;
