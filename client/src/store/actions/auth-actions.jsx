import { authActions } from "../slices/auth-slice";
import axios from "axios";
import { keys } from "../../keys/keys";
import { errorsActions } from "../slices/errors-slice";

export const getCurrentUser = (token) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await axios.get(`${keys.apiUrl}/api/users/currentuser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    };
    dispatch(errorsActions.setErrors([]));
    try {
      const userData = await sendRequest();
      dispatch(authActions.setCurrentUser(userData.currentUser));
      dispatch(errorsActions.setErrors([]));
    } catch (error) {
      const errors = error.response.data.errors;
      dispatch(errorsActions.setErrors(errors));
    }
  };
};

export const postSignup = (signupData, onSuccess) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await axios.post(`${keys.apiUrl}/api/users/signup`, {
        ...signupData,
      });
      return response.data;
    };

    dispatch(errorsActions.setErrors([]));

    try {
      const userData = await sendRequest();
      dispatch(authActions.setToken(userData.token));
      dispatch(errorsActions.setErrors([]));

      onSuccess(userData);
    } catch (error) {
      const errors = error.response.data.errors;
      dispatch(errorsActions.setErrors(errors));
    }
  };
};

export const postSignin = (signinData, onSuccess) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await axios.post(`${keys.apiUrl}/api/users/signin`, {
        ...signinData,
      });
      return response.data;
    };
    dispatch(errorsActions.setErrors([]));

    try {
      const userData = await sendRequest();
      dispatch(authActions.setToken(userData.token));
      dispatch(errorsActions.setErrors([]));

      onSuccess(userData);
    } catch (error) {
      const errors = error.response.data.errors;
      dispatch(errorsActions.setErrors(errors));
    }
  };
};
