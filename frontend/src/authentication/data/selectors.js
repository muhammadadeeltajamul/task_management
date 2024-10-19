export const selectAuthenticationRequestStatus = state => state.user.status;
export const selectAuthenticationErrorMessage = state => state.user.errorMessage;
export const selectIsUserLoggedIn = state => state.user.loggedIn;
export const selectUserEmail = state => state.user.email;
