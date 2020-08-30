import React, { useState } from "react";
import AppBar from "../components/AppBar";
import CompleteButton from "../components/CompleteButton";
import { Link, useHistory } from "react-router-dom";

// To create the styles object
import { makeStyles } from "@material-ui/core/styles";

// Material UI imports
import {
  Grid,
  Container,
  Typography,
  TextField,
  Button,
  Box,
  FormControl
} from "@material-ui/core";

// Styles Object
const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    marginTop: "5%",
    textAlign: "center",
  },
  dailyTotal: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "60px",
  },
  grandTotalBox: {
    textAlign: "right",
    display: "inline-block",
  },
  formInputs__submit: {
    marginTop: "1rem",
    color: "#fff",
    marginTop: "1rem",
    fontWeight: "bold",
  },
  signupContainer: {
    marginTop: "2rem",
  },
  signup_button: {
    textAlign: "center",
    marginTop: "1rem",
    fontWeight: "bold",
  },
  textDecorationNone: {
    textDecoration: "none",
  },
  headerTitle: {
    marginBottom: "2rem",
    fontWeight: "bold",
  },
  wrapper: {
    paddingTop: "3rem",
  },
}));

export default function Login() {
  // Variable to enable ease of use of stlyes object
  const classes = useStyles();
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.jwt) {
          localStorage.jwt = data.jwt;
          localStorage.username = data.user.username;
          localStorage.id = data.user.id;
          // PUSH TO THE HOME ROUTE
         
          window.location.reload();
        }
      });
  };

  return (
    <Container maxWidth="sm" className={classes.wrapper}>
      <Typography variant="h3" className={classes.headerTitle}>
        LOGIN:
      </Typography>
      <Box className="formInputs">
        <form onSubmit={handleSubmit} >
          <TextField
            id="standard-full-width"
            label="Username:"
            style={{ margin: 8 }}
            placeholder="Username"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            id="standard-full-width"
            label="Password:"
            style={{ margin: 8 }}
            type="password"
            placeholder="Password"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            variant="contained"
            color="secondary"
            className={classes.formInputs__submit}
            size="large"
            type="submit"
          >
            SUBMIT
          </Button>
        </form>
      </Box>

      <Box className={classes.signupContainer}>
        <Typography variant="p" align="center" display="block">
          New to GoodMoney? Signup Below!
        </Typography>
        <Box className={classes.signup_button}>
          <Link to="/signup" className={classes.textDecorationNone}>
            <Button variant="outlined" color="secondary" size="large">
              SIGN UP
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
