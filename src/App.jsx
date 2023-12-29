import React, { useState, useEffect } from "react";

import { Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Cookies from "js-cookie"; // Import the Cookies library

import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import SinglePost from "./pages/SinglePost";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EditPost from "./pages/EditPost";
import AppContext from "../store/store";
import ProtectedRoute from "./pages/ProtectedRoute";

import { headers, getUserData } from "./utils/Urls";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const UpdateLoginStatus = (newStatus) => {
    setLoggedIn(newStatus);
  };
  const UpdateUser = (newUser) => {
    setLoggedIn(newUser);
  };

  const cookie = Cookies.get("access_token");
  useEffect(() => {
    const pullUserData = () => {
      fetch(getUserData, {
        method: "GET",
        headers,
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data.user);
          setLoggedIn(true);
        });
    };

    cookie && pullUserData();
  }, []);
  return (
    <AppContext.Provider
      value={{
        isLoggedIn: loggedIn,
        setIsLoggedIn: UpdateLoginStatus,
        user,
        setUpdatedUser: UpdateUser,
      }}
    >
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/createpost"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/posts/edit/:postId" element={<EditPost />} />
        <Route path="/posts/:postId" element={<SinglePost />} />
      </Routes>
    </AppContext.Provider>
  );
};

export default App;
