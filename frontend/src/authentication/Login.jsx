import React, { useContext, useState } from 'react';
import { Button, FormControl, FormLabel, TextField } from '@mui/material';
import Background from './Background';
import { validateEmail } from './utils';
import { ConfigContext } from '../config';

const Login = () => {
  const { APP_NAME } = useContext(ConfigContext);
  const [formData, setFormData] = useState({
    email: '',
    email_error: false,
    password: '',
    password_error: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updateData = {
      [name]: value,
    };
    if (name === 'email') {
        updateData['email_error'] = !validateEmail(value);
    }
    setFormData({
      ...formData,
      ...updateData,
    })
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
                />
              </FormControl>
              <br />
            </div>
          ))
        }
        <br />
        <Button
          variant='contained'
          onClick={handleSubmit}
          disabled={
            formData.email_error || formData.password_error
            || formData.email === "" || formData.password === ""
          }
        >
          Continue
        </Button>
      </form>
    </Background>
  )
}

export default Login;
