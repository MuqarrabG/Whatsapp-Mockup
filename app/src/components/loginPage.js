// src/LoginPage.js
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import makeToast from "./Toaster";
import { loginUser } from "../services/api";
import { setLocalStorage } from "./setGetLocal";
function LoginPage() {
  // State hook for credentials with initial state for 'email' and 'password'.
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  
  // Hook to navigate programmatically with React Router.
  const navigate = useNavigate()
  
  // Handler for form field changes. It updates the credentials state when typing in the form inputs.
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Spreads the previous state and updates the field with the name corresponding to the input's name attribute.
    setCredentials((prevState) => ({ ...prevState, [name]: value }));
  };
  
  // Handler for form submission.
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the browser's default form submission action.
    // Calls the loginUser function with the credentials from the state.
    loginUser(credentials).then((response) => {
      // If login is successful, it shows a success toast with the logged-in user's name.
      makeToast("success", "Logged in as " + response.data.username)
      // Sets the logged-in user information in localStorage for session persistence.
      // Previously using localStorage directly, now using a hypothetical setLocalStorage utility function.
      setLocalStorage("loggedUser", response.data)
      // Navigates to the home route after successful login.
      navigate('/home')
    }).catch((error) => {
      // If there is an error during login, displays an error toast with the error message.
      makeToast("error", error.response.data.error)
    });
    // A console.log for debugging credentials that has been commented out.
  };
  
  // Handler to navigate to the signup page.
  const handleClick = () => {
    navigate('/signup')
  }


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text text-3xl font-bold text-gray-900">
            Login to your account
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
            <div className="relative">
              <label className="text-xl font-normal">Password</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                className="appearance-none rounded-xl relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="@example123stadium"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-zinc-800 text-md font-bold rounded-2xl text-white bg-lime-400 hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              LOGIN
            </button>
          </div>
          <div className="pt-8 text-base font-semibold leading-7">
            <p className="text-gray-900">
              Don't have an account yet?{" "}
              <a
                onClick={handleClick}
                className="font-bold text-lime-500 hover:text-lime-600"
              >
                Signup
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
