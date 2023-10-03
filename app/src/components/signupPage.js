// src/LoginPage.js
import React, { useState } from "react";

function SignupPage() {
  const [credentials, setCredentials] = useState({ email: "", username: "", password: "" ,confirmPassword: ""});
  const [isHovering, setIsHovering] = useState(false);
  const [isComplaint, setIsComplaint] = useState(false);

  if (isHovering) {
    console.log("hovering");
  }

  const hasUpperCase = (password) => /[A-Z]/.test(password);
  const hasLowerCase = (password) => /[a-z]/.test(password);
  const hasDigits = (password) => /\d/.test(password);
  const hasMinLength = (password) => password.length >= 8;
  const passwordsMatch = (password, confirmPassword) =>
    password === confirmPassword && password !== "";

  const requirements = [
    { test: hasUpperCase, message: "Contain at least one uppercase letter" },
    { test: hasLowerCase, message: "Contain at least one lowercase letter" },
    { test: hasDigits, message: "Contain at least one number" },
    { test: hasMinLength, message: "Be at least 8 characters long" },
    { test: passwordsMatch, message: "Passwords must match", isConfirm: true },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Authenticate the user using an API
    console.log(credentials);
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
                href="/"
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
