import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import md5 from "md5";

export default function SignupPage() {
  /* Initialize constants */
  const navigateTo = useNavigate();
  const [formdata, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [validPassword, setValidPassword] = useState("");
  const [submitOnce, setSubmitOnce] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const [validEmail, setValidEmail] = useState();

  /* Restrict length of input for input fields */
  function handleChange(event) {
    const { name, value } = event.target;
    const maxLengths = { username: 21, email: 255, password: 61, passwordConfirm: 61 };
    if (value.length < maxLengths[name]) {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  }

  /* Handle the submit when the sign up bitton is pressed */
  function handleSubmit(event) {
    event.preventDefault();
    setSubmitOnce(true);
    submitUserInfo();
  }

  /* Submit the user info */
  async function submitUserInfo() {
    if (validForm) {
      setShowLoader(true);
      try {
        await axios.post(`/api/signUp`, {
          username: formdata.username,
          email: formdata.email,
          password: md5(formdata.password),
        });
        navigateTo("/login");
        alert("Sign up successfully");
      } catch (error) {
        if (error.response.status !== 500) {
          alert(error.response.data.message);
        }
      }
      setShowLoader(false);
    }
  }

  useEffect(() => {
    /* Password needs at least 8 characters and needs to match the confirmed password */
    function handlePasswordInput() {
      if (formdata.password.length < 8) {
        setValidPassword(submitOnce ? "Password is too short" : "invalid");
      } else if (formdata.password !== formdata.passwordConfirm) {
        setValidPassword(submitOnce ? "Passwords do not match" : "invalid");
      } else {
        setValidPassword("valid");
      }
    }

    /* Check wether th form is valid or not */
    function checkForm() {
      const isValid = formdata.username && formdata.email && formdata.password && validPassword === "valid";
      if (isValid) {
        setValidForm(handleEmail(formdata.email));
      }
    }

    /* Email validation */
    function handleEmail(input) {
      const hasWhitespace = input.includes(" ");
      const validFirstChar = input[0] !== ".";
      const validLastChar = input[input.length - 1] !== ".";
      let validEmail = false;
      /* Email shall not contain spaces and shall not start and end with a dot */
      if (!hasWhitespace && validFirstChar && validLastChar) {
        const atIndex = input.indexOf("@");
        if (atIndex !== -1) {
          const domainName = input.slice(atIndex + 1);
          /* Domain name shall end with a dot */
          if (domainName.includes(".")) {
            validEmail = true;
          }
        }
      }
      setValidEmail(validEmail);
      return validEmail;
    }
    handlePasswordInput();
    checkForm();
  }, [formdata, validPassword, submitOnce]);

  return (
    <div>
      <div>
        <h1>
          Sign Up
        </h1>
        {/* method POST */}
        <form onSubmit={handleSubmit}>
          <div>
            <h4>Username</h4>
            <input
              id="signup-username-input"
              type="username"
              placeholder="User Name"
              name="username"
              onChange={handleChange}
              value={formdata.username}
            />
          </div>

          <div>
            <h4>Email</h4>
            <input
              id="signup-email-input"
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={formdata.email}
            />
          </div>

          <div>
            <h4>Password</h4>
            <input
              id="signup-password-input"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={formdata.password}
            />
          </div>

          <div>
            <h4>Confrim Password</h4>
            <input
              id="signup-confrim-password-input"
              type="password"
              placeholder="Confrim Password"
              name="passwordConfirm"
              onChange={handleChange}
              value={formdata.passwordConfirm}
            />
            {validPassword !== "vaild" && validPassword !== "invaild" && (
              <p> {validPassword} </p>
            )}
            {submitOnce &&
              (!formdata.username || !formdata.email || !formdata.password) && (
                <p> Please input all information! </p>
              )}
            {validEmail === false && submitOnce && (
              <p> Please input vaild email! </p>
            )}
          </div>
          {!showLoader ? (
            <button id="signup-signup-btn">
              Sign Up
            </button>
          ) : (
            <button disabled></button>
          )}
        </form>
        <span>
          Already have an account? &nbsp;
          <p>
            Log In
          </p>
        </span>
      </div>
    </div>
  );
}