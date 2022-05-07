import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import decode from "jwt-decode";

import volley_img from "../../images/volley-logo.png";
import useStyles from "./NavStyles";
// import history from "./History";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dazzle_it = useStyles();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  };
  const signup = () => {
    navigate("/auth");
  };

  //1 hour automatic logout
  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decoded = decode(token);
      if (decoded.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar position="static" color="inherit" className={dazzle_it.appBar}>
      <Link to="/" className={dazzle_it.container}>
        <img
          src={volley_img}
          alt="volley_logo"
          component={Link}
          to="/"
          className={dazzle_it.image}
          //   height="200"
          //   width="600"
        />
      </Link>
      <Toolbar className={dazzle_it.tools}>
        {user ? (
          <div className={dazzle_it.profile}>
            <Avatar
              className={dazzle_it.color}
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography className={dazzle_it.userName} variant="h6">
              {user?.result.name}
            </Typography>
            <Button
              className={dazzle_it.logout}
              variant="contained"
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            // component={Link}
            // to="/auth"
            onClick={signup}
            variant="contained"
            color="primary"
          >
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
