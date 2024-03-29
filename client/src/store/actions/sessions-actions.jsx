import axios from "axios";
import { keys } from "../../keys/keys";
import { errorsActions } from "../slices/errors-slice";
import { sessionsActions } from "../slices/sessions-slice";

export const postSession = (sessionData, token, onSuccess) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await axios.post(
        `${keys.apiUrl}/api/sessions`,
        {
          ...sessionData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    };
    dispatch(errorsActions.setErrors([]));

    try {
      const createdSession = await sendRequest();
      dispatch(errorsActions.setErrors([]));
      onSuccess(createdSession);
    } catch (error) {
      const errors = error.response.data.errors;

      dispatch(errorsActions.setErrors(errors));
    }
  };
};

export const patchSession = (sessionData, sessionId, token, onSuccess) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await axios.patch(
        `${keys.apiUrl}/api/sessions/${sessionId}`,
        {
          ...sessionData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    };
    dispatch(errorsActions.setErrors([]));

    try {
      const createdSession = await sendRequest();
      dispatch(errorsActions.setErrors([]));
      onSuccess(createdSession);
    } catch (error) {
      const errors = error.response.data.errors;

      dispatch(errorsActions.setErrors(errors));
    }
  };
};

export const getSessions = () => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await axios.get(`${keys.apiUrl}/api/sessions`, {});
      return response.data;
    };
    dispatch(errorsActions.setErrors([]));
    try {
      const sessionsData = await sendRequest();
      dispatch(sessionsActions.setSessions(sessionsData));
      dispatch(errorsActions.setErrors([]));
    } catch (error) {
      const errors = error.response.data.errors;
      dispatch(errorsActions.setErrors(errors));
    }
  };
};

export const getOwnerSessions = (token) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await axios.get(
        `${keys.apiUrl}/api/sessions/ownersessions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    };
    dispatch(errorsActions.setErrors([]));
    try {
      const sessionsData = await sendRequest();
      dispatch(sessionsActions.setSessions(sessionsData));
      dispatch(errorsActions.setErrors([]));
    } catch (error) {
      const errors = error.response.data.errors;
      dispatch(errorsActions.setErrors(errors));
    }
  };
};

export const getDetailSession = (sessionId, token) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await axios.get(
        `${keys.apiUrl}/api/sessions/${sessionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    };
    dispatch(errorsActions.setErrors([]));
    try {
      const detailSession = await sendRequest();
      dispatch(sessionsActions.setDetailSession(detailSession));
      dispatch(errorsActions.setErrors([]));
    } catch (error) {
      const errors = error.response.data.errors;
      dispatch(errorsActions.setErrors(errors));
    }
  };
};

export const deleteSession = (sessionId, token, onSuccess) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await axios.delete(
        `${keys.apiUrl}/api/sessions/${sessionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    };
    dispatch(errorsActions.setErrors([]));
    try {
      const sessions = await sendRequest();
      dispatch(sessionsActions.setSessions(sessions));
      dispatch(errorsActions.setErrors([]));
    } catch (error) {
      const errors = error.response.data.errors;
      dispatch(errorsActions.setErrors(errors));
    }
    onSuccess()
  };
};

export const postTimeBlock = (timeBlockData, sessionId, token, onSuccess) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await axios.post(
        `${keys.apiUrl}/api/sessions/${sessionId}/timeblocks`,
        { ...timeBlockData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    };
    dispatch(errorsActions.setErrors([]));
    try {
      const detailSession = await sendRequest();
      dispatch(sessionsActions.setDetailSession(detailSession));
      onSuccess(detailSession)
      dispatch(errorsActions.setErrors([]));
    } catch (error) {
      const errors = error.response.data.errors;
      dispatch(errorsActions.setErrors(errors));
    }
  };
};

export const patchTimeBlock = (timeBlockData, sessionId, token, onSuccess) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await axios.patch(
        `${keys.apiUrl}/api/sessions/${sessionId}/timeblocks`,
        { ...timeBlockData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    };
    dispatch(errorsActions.setErrors([]));
    try {
      const detailSession = await sendRequest();
      dispatch(sessionsActions.setDetailSession(detailSession));
      onSuccess(detailSession)
      dispatch(errorsActions.setErrors([]));
    } catch (error) {
      const errors = error.response.data.errors;
      dispatch(errorsActions.setErrors(errors));
    }
  };
}

export const deleteTimeBlock = (timeBlockId, sessionId, token, onSuccess) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await axios.delete(
        `${keys.apiUrl}/api/sessions/${sessionId}/${timeBlockId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    };
    dispatch(errorsActions.setErrors([]));
    try {
      const detailSession = await sendRequest();
      dispatch(sessionsActions.setDetailSession(detailSession));
      onSuccess(detailSession)
      dispatch(errorsActions.setErrors([]));
    } catch (error) {
      const errors = error.response.data.errors;
      dispatch(errorsActions.setErrors(errors));
    }
  };
}

