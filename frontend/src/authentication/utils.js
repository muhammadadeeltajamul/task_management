export const validateEmail = (email) => (
  Boolean(String(email).toLowerCase().match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ))
);

export const validateLoginPassword = (password) => (
  password.trim() !==  ''
);

export const validateSignUpPassword = (password) => (
  password.trim() !==  ''
);

export const validateLoginForm = (email, password) => (
  validateEmail(email) && validateLoginPassword(password)
);

export const validateSignUpForm = (email, password) => (
  validateEmail(email) && validateSignUpPassword(password)
);
