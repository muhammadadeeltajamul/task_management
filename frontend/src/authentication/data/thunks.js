import { postUserLogin } from "./api"
import { loginFailed, loginUser, userAuthenticationInProgress, userDenied } from "./slices";

export const fetchUserLogin = (email, password) => (
  async (dispatch) => {
    try {
      dispatch(userAuthenticationInProgress());
      console.log("SENDING THUNKS");
      const data = await postUserLogin(email, password);
      console.log("REQUEST THUNKS ", data);
      dispatch(loginUser(data));
      console.log("COMPLETED THUNKS");
    } catch(error) {
        console.log('ERROR ', error);
      if (error.response.status === 401 || error.response.status === 403) {
        dispatch(userDenied(error.response.data));
      } else {
        dispatch(loginFailed(error.response.data));
      }
    }
  }
)