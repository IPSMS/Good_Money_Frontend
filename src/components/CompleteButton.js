import React from "react";

// Material ui imports
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { getThemeProps } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    color: "white",
    borderRadius: "50%",
    width: "400px",
    height: "400px",
    fontSize: "40px",
    fontFamily: "Roboto",
    fontWeight: "bold",
    filter: "drop-shadow(3px 7px 8px #7e7e7e)",
    border: "15px solid #00a015",
    "&:hover": {
      border: "10px solid #599634",
    },
  },
}));

export default function CompleteButton(props) {
  const classes = useStyles();

  // CREATES A STAT FOR CURRENT USER
  const handleClick = () => {
    let today = new Date();
    let date =
      today.getMonth() + 1 + "-" + today.getDate() + "-" + today.getFullYear();
    let todayDate = date;

    if (date[1] === "-") {
      todayDate = "0" + date;
    }
    fetch("http://localhost:3000/stats", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.jwt}`,
      },
      body: JSON.stringify({
        action_amount: 1,
        user_id: localStorage.id,
        logged_time: todayDate,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(todayDate);
        if (!data.error) {
          props.setUserDailyTotal(props.userDailyTotal + 1);
        }
      });
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      className={classes.button}
      onClick={handleClick}
    >
      COMPLETE!
    </Button>
  );
}
