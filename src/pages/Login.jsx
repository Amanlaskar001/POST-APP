import React, { useState, useEffect, useContext } from "react";

import Input from "../components/input/Input";
import Button from "../components/button/Button";

import { headers, loginURL } from "../utils/Urls";
import {
  errorNotification,
  successNotification,
} from "../components/shared/notifications/Notification";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AppContext from "../../store/store";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const context = useContext(AppContext);

  const navigate = useNavigate();

  const formSubmissionHandler = async (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };

    try {
      let response = await fetch(loginURL, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify(userData),
      });
      response = await response.json();
      if (response.success) {
        successNotification("Logged in successfully");
        context.setIsLoggedIn(true);
        context.setUpdatedUser(response.user);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        errorNotification(
          response.message || "Something went wrong in signing in"
        );
      }
    } catch (error) {
      errorNotification(error.message || "Something went wrong in signing in");
    }
  };

  useEffect(() => {
    const isEmailValid = email.includes("@") && email.includes(".");
    const isPasswordValid = password.length >= 1;

    setIsFormValid(isEmailValid && isPasswordValid);
  }, [email, password]);

  return (
    <>
      <section className="grid place-items-center min-h-[88vh]">
        <form
          onSubmit={formSubmissionHandler}
          className="border border-[rgba(0,0,0,0.5)] px-4 py-6 max-w-xl w-[95%] mx-auto rounded-md"
        >
          <h2 className="text-center text-3xl font-bold uppercase  mb-3">
            Login Form
          </h2>
          <Input
            type="email"
            text="Email"
            placeholder="x@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Input
            type="password"
            text="Password"
            placeholder="Your Choosen password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="grid place-items-center mt-4">
            <Button
              text="Login"
              type="submit"
              color="lGreen"
              disabled={!isFormValid}
            />
          </div>
        </form>
      </section>
      <ToastContainer />
    </>
  );
};

export default Login;
