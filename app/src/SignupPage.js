import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import md5 from "md5";

export default function SignupPage() {
  const navigateTo = useNavigate();
  const [formData, setFormData] = useState({username: '', email: '', password: '', passwordConfirm: ''});
  const [validUsername, setValidUsername] = useState(false)
  const [validEmail, setValidEmail] = useState(false)
  const [validPasswordFormat, setValidPasswordFormat] = useState(false)
  const [validPasswordConfirm, setValidPasswordConfirm] = useState(false)
  const [validPassword, setValidPassword] = useState(false)
  const [validForm, setValidForm] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target;
    const maxLengths = { username: 21, email: 255, password: 61, passwordConfirm: 61 };
    if (value.length < maxLengths[name]) {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validForm) {
      const response = await fetch('/api/signUp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: md5(formData.password)
        })
      });
      const data = await response.json();
      console.log(data);
    }
  }

  useEffect(() => {
    /* Check wether the form is valid or not */
    function checkForm() {
      /* Username */
      const usernameRegex = /^.{4,}$/;
      const usernameValidity = usernameRegex.test(formData.username);
      setValidUsername(usernameValidity)

      /* Email */
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      const emailValidity = emailRegex.test(formData.email);
      setValidEmail(emailValidity)

      /* Password */
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#=])[A-Za-z\d@$!%*?&#=]{12,}$/;
      let passwordFormatValidity = passwordRegex.test(formData.password);
      setValidPasswordFormat(passwordFormatValidity)
      if (validPasswordFormat && formData.password === formData.passwordConfirm) {
        setValidPasswordConfirm(true)
      } else{ setValidPasswordConfirm(false) }
      if(validPasswordFormat && validPasswordConfirm) {
        setValidPassword(true)
      } else{ setValidPassword(false) }

      /* Entire Form */
      const validForm = formData.username && formData.email && formData.password && validEmail && validPassword;
      setValidForm(validForm);
      console.log(validForm)
    }
    checkForm();
  }, [formData, validUsername, validEmail, validPasswordFormat, validPasswordConfirm, validPassword]);

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
          <div>
            <h4>Username</h4>
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
          </div>
          <div>
          <h4>Email</h4>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div>
          <h4>Password</h4>
            <input type="text" name="password" value={formData.password} onChange={handleChange} />
          </div>
          <div>
            <h4>Confirm Password</h4>
            <input type="text" name="passwordConfirm" value={formData.passwordConfirm} onChange={handleChange} />
          </div>
          {validForm && (
            <button type="submit">Sign Up </button>
          )}
          {validUsername === false && (
            <p> Username must be at least 4 characters </p>
          )}
          {validEmail === false && validUsername === true && (
            <p> Email must be in the format username@domain.com </p>
          )}
          {validPassword === false && validPasswordFormat === false &&  validUsername === true && validEmail === true && (
            <p>Password must have at least 1 uppercase, 1 lowercase, 1 number, 1 special character (@$!%*?&#=), and be 12 characters or longer</p>
          )}
          {validPassword === false && validPasswordFormat === true && validPasswordConfirm === false &&  validUsername === true && validEmail === true && (
            <p>Passwords need to match</p>
          )}
      </form>
      <span>
          Already have an account?
          <p
            onClick={() => {
              navigateTo("/login");
            }}
          >
            Click to go to login
          </p>
        </span>
    </div>
  );
}