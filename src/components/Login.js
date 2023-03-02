

import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Login.css";
const Login = () => {
  let history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })

  // const { username, password } = formData

  // TODO: CRIO_TASK_MODULE_LOGIN - Fetch the API response
  /**
   * Perform the Login API call
   * @param {{ username: string, password: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/login"
   *
   * Example for successful response from backend:
   * HTTP 201
   * {
   *      "success": true,
   *      "token": "testtoken",
   *      "username": "criodo",
   *      "balance": 5000
   * }
   *
   * Example for failed response from backend:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Password is incorrect"
   * }
   *
   */
  const login = async () => {
    // e.preventDefault();
    if (!validateInput()) return;
    setIsLoading(true);
    const { username, password } = formData
    const newUser = {
      username,
      password,
    }

    // eslint-disable-next-line
    const configApp = {
      headers: {
        "Content-Type": "application/json",
      },
    };


    //const body = JSON.stringify(newUser);


    try {
      const res = await axios.post(config.endpoint + "/auth/login", newUser);
      console.log(res.data);
      //if (res.data.success === true) {
      setIsLoading(false);
      setSuccess(true);
      enqueueSnackbar("Logged in successfully", { variant: "success" })
      persistLogin(res.data.token, res.data.username, res.data.balance)
      history.push('/')
      return res.data
      //}


    } catch (err) {
      setIsLoading(false);
      setSuccess(false);
      if (err.response && err.response.status === 400) {
        enqueueSnackbar("Password is incorrect", { variant: 'error' });
      } else {
        enqueueSnackbar("Something went wrong!", { variant: 'error' });
      }
    }
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Validate the input
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false and show warning message if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that password field is not an empty value - "Password is a required field"
   */
  const validateInput = () => {
    const { username, password } = formData
    if (username === "") {
      enqueueSnackbar("Username is a required field", { variant: "error" })
    } else if (username.length < 6) {
      enqueueSnackbar("Username must be at least 6 characters", { variant: "error" })
    } else if (password === "") {
      enqueueSnackbar("Password is a required field", { variant: "error" })
    } else if (password.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", { variant: "error" })
    } else {
      return true
    }
  };

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  // TODO: CRIO_TASK_MODULE_LOGIN - Persist user's login information
  /**
   * Store the login information so that it can be used to identify the user in subsequent API calls
   *
   * @param {string} token
   *    API token used for authentication of requests after logging in
   * @param {string} username
   *    Username of the logged in user
   * @param {string} balance
   *    Wallet balance amount of the logged in user
   *
   * Make use of localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
   * -    `token` field in localStorage can be used to store the Oauth token
   * -    `username` field in localStorage can be used to store the username that the user is logged in as
   * -    `balance` field in localStorage can be used to store the balance amount in the user's wallet
   */
  const persistLogin = (token, username, balance) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("balance", balance);
  };

  const { username, password } = formData

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons={true}/>
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Login</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            value={username}
            onChange={handleChange}
            required
            placeholder="Enter Username"
            fullWidth

          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            helperText="Password must be atleast 6 characters length"
            fullWidth
            required
            placeholder="Enter a password with minimum 6 characters"
          />

          {isLoading ? <div className="loading"><CircularProgress /></div> :
            <Button className="button" variant="contained" onClick={login}>
              Login to QKart
            </Button>
          }


          <p className="secondary-action">
            Don't have account?{" "}
            <Link className="link" to="/register">
              Register Now
            </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Login;
