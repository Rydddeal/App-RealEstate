import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Registerpage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const registerUser = async (ev) => {
    ev.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/register", {
        name,
        email,
        password,
      });
      console.log("Registration successful!", response.data);
    } catch (error) {
      console.error("Registration failed!", error);
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Registration failed! Please try again later.");
      }
    }
  };

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            required // Add required attribute for form validation
          />
          <input
            type="email"
            placeholder="your@mail.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            required // Add required attribute for form validation
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            required // Add required attribute for form validation
          />
          <button type="submit" className="primary">
            Register
          </button>
          {error && <div className="text-red-500">{error}</div>}{" "}
          <div className="text-center py-2 text-gray-500">
            Already a member?{" "}
            <Link className="underline text" to={"/login"}>
              Login now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registerpage;
