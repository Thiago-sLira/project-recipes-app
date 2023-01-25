/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { saveLocalStorage } from '../../localStorage/localStorage';

const SIX = 6;
function Login() {
  const [loginInputs, setLoginInputs] = useState({
    email: '', password: '',
  });

  const history = useHistory();

  const handleChange = ({ target: { name, value } }) => {
    setLoginInputs({
      ...loginInputs,
      [name]: value,
    });
  };

  const handleInputsValidation = () => {
    const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
    const verifyEmailInput = emailRegex.test(loginInputs.email);

    const verifyPasswordInput = loginInputs.password.length >= SIX;

    if (verifyEmailInput && verifyPasswordInput) {
      setLoginInputs({ ...loginInputs, isDisabled: false });
    } else {
      setLoginInputs({ ...loginInputs, isDisabled: true });
    }
  };

  const handleClick = () => {
    saveLocalStorage('user', { email: loginInputs.email });
    history.push('/meals');
  };

  useEffect(() => {
    handleInputsValidation();
  }, [loginInputs.email, loginInputs.password]);

  return (
    <div>
      <form>
        <h1>LOGIN</h1>
        <input
          type="email"
          name="email"
          value={ loginInputs.email }
          id="input-email"
          data-testid="email-input"
          placeholder="Email"
          onChange={ handleChange }
        />
        <input
          type="password"
          name="password"
          value={ loginInputs.password }
          id="input-password"
          data-testid="password-input"
          placeholder="Password"
          onChange={ handleChange }
        />
        <button
          data-testid="login-submit-btn"
          type="button"
          disabled={ loginInputs.isDisabled }
          onClick={ handleClick }
        >
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;
