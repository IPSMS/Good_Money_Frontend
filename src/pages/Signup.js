import React, { useState } from "react";
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

export default function Signup() {
  // Variable to enable ease of use of stlyes object
  const classes = useStyles();
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        username: username,
        password: password,
        password_confirmation: passwordConfirmation,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.jwt) {
          console.log(data);
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
        SIGN UP:
      </Typography>
      <Box className="formInputs">
        <form onSubmit={handleSubmit}>
          <TextField
            id="standard-full-width"
            label="First Name:"
            style={{ margin: 8 }}
            placeholder="Enter First Name"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />

          <TextField
            id="standard-full-width"
            label="Last Name:"
            style={{ margin: 8 }}
            placeholder="Enter Last Name"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />

          <TextField
            id="standard-full-width"
            label="Username:"
            style={{ margin: 8 }}
            placeholder="Enter Username"
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
            type="password"
            style={{ margin: 8 }}
            placeholder="Enter Password"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <TextField
            id="standard-full-width"
            label="Password Confirmation:"
            type="password"
            style={{ margin: 8 }}
            placeholder="Enter Password Confirmation"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setPasswordConfirmation(e.target.value);
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
    </Container>
  );
}
