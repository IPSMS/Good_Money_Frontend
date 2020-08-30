import React, {useState} from "react";
import "../App.css";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { BrowserRouter as Redirect, Switch, Route, Link } from "react-router-dom";

export default function App() {

  const [userIsAuthorized, setUserIsAuthorized] = useState(false);

  fetch("http://localhost:3000/profile", {
    headers: {
      Authorization: `Bearer ${localStorage.jwt}`,
    },
  })
    .then((res) => res.json())
    .then((user) => {
      if (!user.error) {
        setUserIsAuthorized(true);
      }
    });
  
  return (
      <Switch>
        <Route exact path="/">
          
            { userIsAuthorized ? <Home /> : <Login /> } 

        </Route>
        <Route path="/signup">

          { userIsAuthorized ? <Home /> : <Signup /> } 
            
          
        </Route>
      </Switch>
  );
  
  
}
