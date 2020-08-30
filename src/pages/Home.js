import React, { useState } from "react";
import AppBar from "../components/AppBar";
import CompleteButton from "../components/CompleteButton";

// To create the styles object
import { makeStyles } from "@material-ui/core/styles";

// Material UI imports
import { Grid, Typography, Box, Container } from "@material-ui/core/";

// Router
import { Redirect } from "react-router-dom";

// Styles Object
const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    marginTop: "5rem",
    textAlign: "center",
  },
  dailyTotal: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "60px",
    color: "#00D01B",
    marginBottom: "3.5rem",
  },
  grandTotalBox: {
    display: "inline-block",
    border: "1px solid #676767",
    padding: "1rem",
    marginTop: "1rem",
    width: "10rem",
    fontSize: "1.5rem",
    color: "#5f5b5b",
  },
  grandTotalTitle: {
    fontWeight: "bold",
    color: "#676767",
  },
  grandTotalWrapper: {
    textAlign: "center",
    marginTop: "3rem",
  },
  dailyTotalHeading: {
    fontWeight: "bold",
    marginBottom: "1.5rem",
  },
}));

export default function Home() {
  // Variable to enable ease of use of stlyes object
  const classes = useStyles();
  const [userTotal, setUserTotal] = useState(0);
  const [userDailyTotal, setUserDailyTotal] = useState(0);
  const [userName, setUserName] = useState("");

  fetch("http://localhost:3000/profile", {
    headers: {
      Authorization: `Bearer ${localStorage.jwt}`,
    },
  })
    .then((res) => res.json())
    .then((user) => {
      if (!user.error) {
        setUserName(user.username);
      }
    });

  fetch("http://localhost:3000/usertotal/:id", {
    headers: {
      Authorization: `Bearer ${localStorage.jwt}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setUserTotal(data);
    });

  fetch("http://localhost:3000/userdailytotal/:id", {
    headers: {
      Authorization: `Bearer ${localStorage.jwt}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setUserDailyTotal(data);
    });

  if( !userName ){
    return <Redirect to="/" />
  }

  return (
    <Grid container direction="column" justify="center">
      <AppBar userName={userName} />
      <Grid item md={12} justify="center" className={classes.grandTotalWrapper}>
        <Typography variant="h5" className={classes.grandTotalTitle}>
          GRAND TOTAL:
        </Typography>
        <Box className={classes.grandTotalBox}>
          <span>{"$" + userTotal}</span>
        </Box>
      </Grid>
      <Grid item md={12} className={classes.buttonContainer}>
        <Typography variant="h3" className={classes.dailyTotalHeading}>
          DAILY EARNINGS:
        </Typography>

        <Typography variant="h4" className={classes.dailyTotal}>
          {"$" + userDailyTotal}
        </Typography>

        <CompleteButton
          setUserDailyTotal={setUserDailyTotal}
          userDailyTotal={userDailyTotal}
        />
      </Grid>
    </Grid>
  );
}
