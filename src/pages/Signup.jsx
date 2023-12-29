import React, { useState, useEffect } from "react";

import Input from "../components/input/Input";
import Button from "../components/button/Button";
import { headers, signupURL } from "../utils/Urls";
import {
  errorNotification,
  successNotification,
} from "../components/shared/notifications/Notification";
import { useNavigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";

const Signup = () => {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();

  const formSubmissionHandler = async (e) => {
    e.preventDefault();
    const userData = {
      fullname,
      email,
      password,
    };

    try {
      let response = await fetch(signupURL, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify(userData),
      });
      response = await response.json();
      if (response.success) {
        successNotification("Signed up successfully");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        if (response.message.includes("duplicate key")) {
          errorNotification("Duplicate Email");
        } else {
          errorNotification(
            response.message || "Something went wrong in signing up"
          );
        }
      }
    } catch (error) {
      errorNotification(error.message || "Something went wrong in signing up");
    }
  };

  useEffect(() => {
    const isFullNameValid = fullname.length >= 3;
    const isEmailValid = email.includes("@") && email.includes(".");
    const isPasswordValid = password.length >= 4;

    setIsFormValid(isFullNameValid && isEmailValid && isPasswordValid);
  }, [fullname, email, password]);

  // Update form validity whenever the input fields change

  return (
    <>
      <section className="grid place-items-center min-h-[88vh]">
        <form
          onSubmit={formSubmissionHandler}
          className="border border-[rgba(0,0,0,0.5)] px-4 py-6 max-w-xl w-[95%] mx-auto rounded-md"
        >
          <h2 className="text-center text-3xl font-bold uppercase mb-3">
            SignUp Form
          </h2>
          <Input
            type="text"
            text="FullName"
            placeholder="At least 3 characters"
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            value={fullname}
          />
          <Input
            type="email"
            text="Email"
            placeholder="x@gmail.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
          <Input
            type="password"
            text="Password"
            placeholder="At least 4 characters"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          <div className="grid place-items-center mt-4">
            <Button
              text="Signup"
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

export default Signup;
