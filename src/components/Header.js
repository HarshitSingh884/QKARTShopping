import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
// Below are dependencies added by me
import { InputAdornment, TextField } from "@mui/material";
import { Search, SentimentDissatisfied } from "@mui/icons-material";

const Header = ({ children, hasHiddenAuthButtons }) => {
  // ,setSearchString,searchString
  let history = useHistory();

  // const updateSearchString=(e)=>{
  //   setSearchString(e.target.value)
  // }

  return (
    <Box className="header">
      <Box className="header-title">
        <img src="logo_light.svg" alt="QKart-icon"></img>
      </Box>

      {/* my prev. parameters for Condition1:(children === "register" || children === "login")  */}
      {(children === "register" || children === "login") && (
        <Box>
          <Button
            className="explore-button"
            startIcon={<ArrowBackIcon />}
            variant="text"
            onClick={() => history.push("/")}
          >
            {/* <Link className="link" to="/"> */}
            Back to explore
            {/* </Link> */}
          </Button>
        </Box>
      )}

      {/* {children === "products" && hasHiddenAuthButtons > 0 && (
        <Box>
          <TextField
            className="search-desktop"
            size="small"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search color="primary" />
                </InputAdornment>
              ),
            }}
            placeholder="Search for items/categories"
            name="search"
            value={searchString}
            onChange={updateSearchString}
          />
        </Box>
      )} */}

      {/* my prev parameters for below condition : children === "products" && hasHiddenAuthButtons > 0 */}
      {children === "products" && hasHiddenAuthButtons > 0 && (
        <Box>
          <Button variant="text">
            <img src="avatar.png" alt={window.localStorage.username} />
            <p className="username-text">{window.localStorage.username}</p>
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              window.localStorage.clear();
              history.push("/");
            }}
          >
            {/* <Link className="link" to="/"> */}
            LOGOUT
            {/* </Link> */}
          </Button>
        </Box>
      )}

      {/* {children === "products" && hasHiddenAuthButtons === 0 && (
        <Box>
          <TextField
            className="search-desktop"
            size="small"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search color="primary" />
                </InputAdornment>
              ),
            }}
            placeholder="Search for items/categories"
            name="search"
            value={searchString}
            onChange={updateSearchString}
          />
        </Box>
      )} */}

      {/* my prev. parameters for below condition: children === "products" && hasHiddenAuthButtons === 0 */}
      {children === "products" && hasHiddenAuthButtons === 0 && (
        <Box>
          <Button variant="text" onClick={() => history.push("/login")}>
            {/* <Link className="link" to="/login"> */}
            LOGIN
            {/* </Link> */}
          </Button>
          <Button variant="contained" onClick={() => history.push("/register")}>
            {/* <Link className="link" to="/register"> */}
            REGISTER
            {/* </Link> */}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Header;
