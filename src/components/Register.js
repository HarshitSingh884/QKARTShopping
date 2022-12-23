import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import { useHistory, Link } from "react-router-dom";

const Register = (props) => {
  const { enqueueSnackbar } = useSnackbar();

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const history = useHistory();
  const [loading, setLoading] = useState(false);

  // const[dataValidation , setDataValidation]=useState(false); // i used this state for formValidation but bcoz of this only testcases were failing.

  const inputHandler = (event) => {
    const [inputFieldName, inputFieldValue] = [
      event.target.name,
      event.target.value,
    ];

    // setFormData({...formData, [inputFieldName]:inputFieldValue});

    if (inputFieldName === "username") {
      setFormData({
        username: inputFieldValue,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
    } else if (inputFieldName === "password") {
      setFormData({
        username: formData.username,
        password: inputFieldValue,
        confirmPassword: formData.confirmPassword,
      });
    } else {
      setFormData({
        username: formData.username,
        password: formData.password,
        confirmPassword: inputFieldValue,
      });
    }

    // console.log("FormDATA",formData.username);
  };

  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  let isDataValidated;
  const register = async (formData) => {
    //#MYCOMMENT : we will not use formData as parameter bcoz not required.

    setLoading(true);
    isDataValidated = validateInput(formData);
    if (isDataValidated) {
      console.log("after register", formData);

      // console.log("postURL", props.postURL); //working fine
      // props.postURL+ "/auth/register"
      const formPayLoad = {
        username: formData.username,
        password: formData.password,
      };

      try {
        await axios
          .post(`${config.endpoint}/auth/register`, formPayLoad)
          .then((response) => {
            console.log("peekaa", response.data.success);
            setLoading(false);
            enqueueSnackbar("success", {
              variant: "success",
            });
            (() => history.push("/login", { from: "HomePage" }))();
          });
      } catch (error) {
        //error.response gives an object from where we can see req is success or 400error.
        // console.log("LULAAA",error.message)

        if (error.response) {
          enqueueSnackbar("Username is already taken", {
            variant: "error",
          });
        } else {
          // Something went wrong.Check that the backend is running, reachable and returns valid json
          enqueueSnackbar(error.message, {
            variant: "error",
          });
        }
      }
      // setLoading(false);//this is a mistake by me bcoz by using this even if data is not validated it will spin upto infinite bcoz it will never get into if condition and loading will not be false;
    }

    setLoading(false);
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    console.log("Inside validateInput function");

    if (!data.username) {
      enqueueSnackbar("Username is a required field", { variant: "warning" });
      return false;
    }
    if (data.username.length < 6) {
      enqueueSnackbar("Username must be at least 6 characters", {
        variant: "warning",
      });
      return false;
    }
    if (!data.password) {
      enqueueSnackbar("Password is a required field", { variant: "warning" });
      return false;
    }
    if (data.password.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", {
        variant: "warning",
      });
      return false;
    }
    if (!data.confirmPassword) {
      enqueueSnackbar("ConfirmPassword is a required field", {
        variant: "warning",
      });
      return false;
    }
    if (data.password !== data.confirmPassword) {
      enqueueSnackbar("Password do not match", { variant: "warning" });
      return false;
    }
    // console.log("Not Returned"); //testing

    // setDataValidation(true);
    return true;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
     
      <Header hasHiddenAuthButtons  children={"register"}/>
     
      {/* <Header hasHiddenAuthButtons /> */}
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            value={formData.username}
            onChange={inputHandler}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            value={formData.password}
            onChange={inputHandler}
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            value={formData.confirmPassword}
            onChange={inputHandler}
          />
          {!loading && (
            <Button
              // className="button"
              variant="contained"
              onClick={() => register(formData)}
            >
              Register Now
            </Button>
          )}
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          )}

          <p className="secondary-action">
            Already have an account?{" "}
            {/* <a className="link" href="#">
              Login here
            </a> */}
            <Link className="link" to="/login">
              Login here
            </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
