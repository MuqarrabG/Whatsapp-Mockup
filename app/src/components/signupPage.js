// src/LoginPage.js
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { registerUser } from "../services/api";
import makeToast from "./Toaster";

function SignupPage() {
  // State hook to store user credentials. Initializes with default empty values.
  const [credentials, setCredentials] = useState({ email: "", username: "", password: "", confirmPassword: ""});
  
  // State hook to store a boolean indicating if the form is for a complaint.
  const [isComplaint, setIsComplaint] = useState(false);
  
  // A hook to navigate programmatically in a React Router environment.
  const navigate = useNavigate()
  
  // Functions to validate the password based on different criteria.
  const hasUpperCase = (password) => /[A-Z]/.test(password);
  const hasLowerCase = (password) => /[a-z]/.test(password);
  const hasDigits = (password) => /\d/.test(password);
  const hasMinLength = (password) => password.length >= 8;
  // Function to check if the password and confirm password fields match.
  const passwordsMatch = (password, confirmPassword) => password === confirmPassword && password !== "";
  
  // An array of objects that defines the password requirements.
  const requirements = [
    { test: hasUpperCase, message: "Contain at least one uppercase letter" },
    { test: hasLowerCase, message: "Contain at least one lowercase letter" },
    { test: hasDigits, message: "Contain at least one number" },
    { test: hasMinLength, message: "Be at least 8 characters long" },
    { test: passwordsMatch, message: "Passwords must match", isConfirm: true },
  ];
  
  // Event handler for form field changes, updates the credentials state.
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Set new values in credentials while keeping the old ones intact.
    setCredentials((prevState) => ({ ...prevState, [name]: value }));
  };
  
  // Event handler for form submission.
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior.
    // Calls the registerUser function with the credentials state.
    registerUser(credentials).then((response) => {
      // On successful registration, displays a success toast and navigates to loginpage.
      makeToast("success", response.data)
      navigate('/')
    }).catch((error) => {
      // On error, displays an error toast with the error message from the server's response.
      makeToast("error", error.response.data)
    });
  };
  
  // Event handler to navigate the user to the login page.
  const handleToLogin = () => {
    navigate('/')
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text text-3xl font-bold text-gray-900">
            Sign up for an account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="pb-5">
              <label className="text-xl font-normal">Email address</label>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
                className="appearance-none rounded-xl relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="example@gmail.com"
              />
            </div>
            <div className="pb-5">
              <label className="text-xl font-normal">Username</label>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                required
                className="appearance-none rounded-xl relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="examplewarrior"
              />
            </div>
            <div className="relative pb-5">
              <label className="text-xl font-normal">Password</label>
              <input
                type="password"
                name="password"
                onFocus={() => setIsComplaint(true)}
                onBlur={() => setIsComplaint(false)}
                value={credentials.password}
                onChange={handleChange}
                required
                className="appearance-none rounded-xl relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="example123Stadium"
              />
            </div>
            <div className="relative">
              <label className="text-xl font-normal">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                onFocus={() => setIsComplaint(true)}
                onBlur={() => setIsComplaint(false)}
                value={credentials.confirmPassword}
                onChange={handleChange}
                required
                className="appearance-none rounded-xl relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="example123Stadium"
              />
            </div>
            <div className="pb-2">
              {isComplaint && (
                <div className="my-2 p-4 bg-white text-sm text-gray-700 border rounded shadow-lg">
                  <p>Password must:</p>
                  <ul className="list-disc list-inside">
                    {requirements.map((req, index) => (
                      <li
                        key={index}
                        className={
                          req.test(
                            credentials.password,
                            credentials.confirmPassword
                          )
                            ? "text-green-600"
                            : ""
                        }
                      >
                        {req.message}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-zinc-800 text-md font-bold rounded-2xl text-white bg-lime-400 hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              SIGN UP
            </button>
          </div>
          <div className="pt-8 text-base font-semibold leading-7">
            <p className="text-gray-900">
              Already have an account?{" "}
              <a
                onClick={handleToLogin}
                className="font-bold text-lime-500 hover:text-lime-600"
              >
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
