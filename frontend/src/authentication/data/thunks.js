import { getIsUserLoggedIn, postUserLogin, postUserSignUp } from "./api"
import { loginFailed, loginUser, userAuthenticationInProgress, userDenied } from "./slices";

export const fetchUserLogin = (email, password) => (
  async (dispatch) => {
    try {
      dispatch(userAuthenticationInProgress());
      const data = await postUserLogin(email, password);
      dispatch(loginUser(data));
    } catch(error) {
      if (error.response.status === 401 || error.response.status === 403) {
        dispatch(userDenied(error.response.data));
      } else {
        dispatch(loginFailed(error.response.data));
      }
    }
  }
);

export const fetchIsUserLoggedIn = () => (
  async (dispatch) => {
    try {
      dispatch(userAuthenticationInProgress());
      const data = await getIsUserLoggedIn();
      dispatch(loginUser(data));
    } catch(error) {
      if (error.response.status === 401 || error.response.status === 403) {
        dispatch(userDenied(""));
      } else {
        dispatch(loginFailed(""));
      }
    }
  }
);

export const fetchUserSignUp = (email, password) => (
  async (dispatch) => {
    try {
      dispatch(userAuthenticationInProgress());
      const data = await postUserSignUp(email, password);
      dispatch(loginUser(data));
    } catch(error) {
      if (error.response.status === 401 || error.response.status === 403) {
        dispatch(userDenied(error.response.data));
      } else {
        dispatch(loginFailed(error.response.data));
      }
    }
  }
);
