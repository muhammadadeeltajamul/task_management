import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, FormControl, FormHelperText, FormLabel, TextField } from '@mui/material';
import Background from './Background';
import { selectAuthenticationErrorMessage, selectAuthenticationRequestStatus, selectIsUserLoggedIn } from './data/selectors';
import { fetchUserLogin } from './data/thunks';
import { validateEmail, validateLoginForm } from './utils';
import { setAppHeader } from '../components/data/slice';
import { ConfigContext } from '../config';
import { AppRoutes, RequestStatus } from '../constant';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);
  const requestStatus = useSelector(selectAuthenticationRequestStatus);
  const errorMessage = useSelector(selectAuthenticationErrorMessage);
  const { APP_NAME } = useContext(ConfigContext);
  dispatch(setAppHeader(false));
  const [formData, setFormData] = useState({
    email: '',
    email_error: false,
    password: '',
    password_error: false,
  });
  const requestInProgress = requestStatus === RequestStatus.IN_PROGRESS;

  if (isUserLoggedIn === true) {
    return navigate(AppRoutes.BOARDS);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updateData = {
      [name]: value,
    };
    if (name === 'email') {
      updateData['email_error'] = !validateEmail(value);
    }
    if (name === 'password') {
      updateData['password_error'] = value === '';
    }
    setFormData({
      ...formData,
      ...updateData,
    })
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateLoginForm(formData.email, formData.password)) {
      dispatch(fetchUserLogin(formData.email, formData.password));
    }
  };

  const fields = [
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
  ]

  return (
    <Background>
      <form>
        <div className='d-flex flex-column mb-2r'>
          <h2 className='mx-auto'>{APP_NAME}</h2>
          <h3 className='mx-auto'>Login</h3>
        </div>
        {
          fields.map((field) => (
            <div className="mb-1r" key={field.name}>
              <FormControl>
                <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
                <TextField
                  name={field.name}
                  type={field.type}
                  value={formData[field.name]}
                  size="small"
                  onChange={handleChange}
                  error={formData[`${field.name}_error`]}
                  disabled={requestInProgress}
                />
              </FormControl>
              <br />
            </div>
          ))
        }
        {
          [RequestStatus.DENIED, RequestStatus.FAILED].includes(requestStatus) && (
            <FormHelperText error>
              {errorMessage}
            </FormHelperText>
          )
        }
        <br />
        <Button
          variant='contained'
          onClick={handleSubmit}
          disabled={
            formData.email_error || formData.password_error
            || formData.email === "" || formData.password === ""
            || requestInProgress
          }
        >
          Continue
        </Button>
      </form>
    </Background>
  )
}

export default React.memo(Login);
