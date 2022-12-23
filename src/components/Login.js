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
  const { enqueueSnackbar } = useSnackbar();

  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleInput = (event) => {
    const [inputFieldName, inputFieldValue] = [
      event.target.name,
      event.target.value,
    ];

    if (inputFieldName === "username") {
      setLoginFormData({
        username: inputFieldValue,
        password: loginFormData.password,
      });
    }
    if (inputFieldName === "password") {
      setLoginFormData({
        username: loginFormData.username,
        password: inputFieldValue,
      });
    }
  };

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

  let isLoginDataValidated;

  const login = async (formData) => {
    // console.log("Login Form Data",loginFormData);
    setLoading(true);
    isLoginDataValidated = validateInput(formData);

    if (isLoginDataValidated) {
      const formPayLoad = {
        username: loginFormData.username,
        password: loginFormData.password,
      };

      try {
        await axios
          .post(`${config.endpoint}/auth/login`, formPayLoad)
          .then((response) => {
            setLoading(false);
            enqueueSnackbar("Logged in successfully", {
              variant: "success",
            });
            console.log("HERE IS THE RESPONSE", response.data);

            const token = response.data.token;
            const balance = response.data.balance;
            persistLogin(token, loginFormData.username, balance); //calling persistLogin() function

            // window.localStorage.setItem("username",loginFormData.username)
            // console.log("HISTORY" ,window.localStorage); //to test window.localstorage
            (() => history.push("/", { from: "Login" }))();
          });
      } catch (error) {
        if (error.response) {
          setLoading(false);
          enqueueSnackbar("password is incorrect", {
            variant: "erorr",
          });
        } else {
          setLoading(false);
          enqueueSnackbar(error.message, {
            variant: "error",
          });
        }
      }
    }

    setLoading(false);
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
  const validateInput = (data) => {
    if (!data.username) {
      enqueueSnackbar("Username is a required field", {
        variant: "warning",
      });
      return false;
    }
    if (!data.password) {
      enqueueSnackbar("Password is a required field", {
        variant: "warning",
      });
      return false;
    }

    return true;
  };

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
    console.log("Welcome to persistLogin() function");

    window.localStorage.setItem("token", token);
    window.localStorage.setItem("username", username);
    window.localStorage.setItem("balance", balance);

    console.log("Window localStorage is", window.localStorage);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
     
      <Header hasHiddenAuthButtons  children={"login"}/>
      

      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Login</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            value={loginFormData.username}
            onChange={handleInput}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            value={loginFormData.password}
            onChange={handleInput}
          />
          {!loading && (
            <Button
              // className="button"
              variant="contained"
              onClick={() => login(loginFormData)}
            >
              LOGIN TO QKART
            </Button>
          )}
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          )}
          <p className="secondary-action">
            Don't have an account?{" "}
            {/* <a className="link" href="#">
              Register now
            </a> */}
            <Link className="link" to="/register">
              Register now
            </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Login;
