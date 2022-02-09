import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../utils/url";
import user from "../reducers/user";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styled from "styled-components/macro";

const EyeButton = styled.button`
  background-color: white;
  color: grey;

  :hover {
    color: blue;
  }
  :focus {
    color: green;
  }
`;

const EyeButtonSignup = styled(EyeButton)``;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mode, setMode] = useState("signup");
  const [showPassword, setShowPassword] = useState(true);

  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, email }),
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setEmail(data.response.email));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setEmail(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(data.response));
          });
        }
      });
  };

  const togglePassword = () => {
    if (!showPassword) setShowPassword(true);
    else setShowPassword(false);
  };

  return (
    <>
      <section>
        <form onSubmit={onFormSubmit}>
          {/* <label htmlFor="signup">Signup</label> */}
          <div style={{ display: "flex" }} className="toggle">
            <input id="signup" type="radio" checked={mode === "signup"} onChange={() => setMode("signup")} />
            {/* <label htmlFor="signin">Signin</label> */}
            <input id="signin" type="radio" checked={mode === "signin"} onChange={() => setMode("signin")} />
          </div>

          <h3>{mode === "signup" ? "SIGN UP" : "LOGIN"}</h3>

          <label htmlFor="username">Username</label>
          <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <label htmlFor="password">Password</label>
          <input id="password" type={showPassword ? "password" : "text"} value={password} onChange={(e) => setPassword(e.target.value)} />
          <EyeButtonSignup type="button" onClick={togglePassword}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </EyeButtonSignup>
          {mode === "signup" && (
            <>
              <label htmlFor="email">E-mail address</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </>
          )}
          <button className="loginButton" type="submit">
            Submit
          </button>
        </form>
      </section>
    </>
  );
};

export default Login;
