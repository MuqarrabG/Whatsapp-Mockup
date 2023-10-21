// src/LoginPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import makeToast from "./Toaster";
import { loginUser } from "../services/api";
import { setLocalStorage } from "./setGetLocal";
function LoginPage() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(credentials).then((response) => {
      makeToast("success", "Logged in as "+response.data.username)
      // localStorage.setItem("userloggedin", JSON.stringify(response.data));
      setLocalStorage("loggedUser", response.data)
      navigate('/home')
    }).catch((error) => {
      console.log(error)
      makeToast("error", error.response.data.error)
    })
    //console.log(credentials);
  };

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
                href="/signup"
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
