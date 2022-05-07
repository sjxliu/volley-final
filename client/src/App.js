// Dependency imports
import React from "react";
import { Container } from "@material-ui/core";
//import { Switch } from "@material-ui/core";
import {BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Variable imports

import Navbar from "./components/Nav/Navbar";
import Home from "./components/Homepage/Home";
import Auth from './components/Authentication/Auth'
import PostDetails from "./components/PostItems/PostDetails";

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <Router>
      <Container maxwidth="xl">
        <Navbar />
        <Routes>
        <Route path="/" exact element={() => <Navigate to="/posts" />} />
          <Route path="/posts" exact element={<Home/>}/>
          <Route path="/posts/search" exact element={<Home/>} />
          <Route path="/posts/:id" exact element={<PostDetails/>} />
          <Route path="/auth" exact element={() => (!user ? Auth() : <Navigate to="/posts" />)} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
