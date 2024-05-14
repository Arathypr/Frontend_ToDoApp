import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import usericon from "../assets/person.png";
import emailicon from "../assets/email.png";
import passwordicon from "../assets/password.png";

function Login() {
  const [action, setAction] = useState("Sign Up");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSignUp = async () => {
    const errors = {};
    let isValid = true;

    // Validation
    if (!firstName.trim()) {
      errors.firstName = "First name is required";
      isValid = false;
    }
    if (!lastName.trim()) {
      errors.lastName = "Last name is required";
      isValid = false;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }
    if (username.length < 6) {
      errors.username = "Username should be at least 6 characters long";
      isValid = false;
    }
    if (password.length < 6) {
      errors.password = "Password should be at least 6 characters long";
      isValid = false;
    }

    setErrorMessages(errors);

    if (!isValid) return;

    // Send request post API
    try {
      const response = await axios.post("http://localhost:8080/postUser", {
        firstName,
        lastName,
        email,
        userName: username,
        password,
      });

      if (response.status === 200) {
        console.log("Sign up successful");
        alert("Sign up successful");
      } else {
        console.error("Sign up failed:", response.statusText);
        alert("Sign up failed: " + response.statusText);
      }
    } catch (error) {
      console.error("Sign up failed:", error.message);
      alert("Sign up failed: " + error.message);
    }
  };

  const handleLogin = async () => {
    setErrorMessages({});

    // Validation
    if (!username.trim() || !password.trim()) {
      setErrorMessages({
        username: "Username is required",
        password: "Password is required",
      });
      return;
    }

    // Send request get API
    try {
      const response = await axios.get("http://localhost:8080/getUser", {
        params: {
          userName: username,
          password: password,
        },
      });

      if (response.data !== null) {
        console.log("Login successful");
        alert("Login successful");
        navigate("/homepage", { state: { username: username } });
      } else {
        setErrorMessages({ username: "Invalid username or password" });
        console.error("Login failed: Invalid username or password");
        alert("Login failed: Invalid username or password");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="bg-blue-950 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-4">
          <div className="text-xl font-bold">{action}</div>
          <div className="border-b-2 border-blue-500 w-12 mx-auto mt-2"></div>
        </div>
        {action === "Sign Up" && (
          <>
            <div className="mb-4">
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <img src={usericon} alt="" className="w-5 h-5 mr-2" />
                <input
                  type="text"
                  placeholder="First Name"
                  className="bg-transparent focus:outline-none flex-1"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              {errorMessages.firstName && (
                <div className="text-red-500">{errorMessages.firstName}</div>
              )}
            </div>
            <div className="mb-4">
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <img src={usericon} alt="" className="w-5 h-5 mr-2" />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="bg-transparent focus:outline-none flex-1"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              {errorMessages.lastName && (
                <div className="text-red-500">{errorMessages.lastName}</div>
              )}
            </div>
            <div className="mb-4">
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <img src={emailicon} alt="" className="w-5 h-5 mr-2" />
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-transparent focus:outline-none flex-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {errorMessages.email && (
                <div className="text-red-500">{errorMessages.email}</div>
              )}
            </div>
          </>
        )}
        <div className="mb-4">
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <img src={usericon} alt="" className="w-5 h-5 mr-2" />
            <input
              type="text"
              placeholder="Username"
              className="bg-transparent focus:outline-none flex-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {errorMessages.username && (
            <div className="text-red-500">{errorMessages.username}</div>
          )}
        </div>
        <div className="mb-4">
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <img src={passwordicon} alt="" className="w-5 h-5 mr-2" />
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent focus:outline-none flex-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessages.password && (
            <div className="text-red-500">{errorMessages.password}</div>
          )}
        </div>
        <div className="text-sm text-blue-500 cursor-pointer mb-4">
          Forgot Password <span className="text-blue-700">Click Here</span>
        </div>
        <div className="flex justify-between">
          <div
            className={`cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg ${
              action === "Login" ? "opacity-50" : ""
            }`}
            onClick={() => {
              setAction("Sign Up");
              handleSignUp();
            }}
          >
            Sign Up
          </div>
          <div
            className={`cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg ${
              action === "Sign Up" ? "opacity-50" : ""
            }`}
            onClick={() => {
              setAction("Login");
              handleLogin();
            }}
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
