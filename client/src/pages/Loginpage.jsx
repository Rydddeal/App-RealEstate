import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../User/UserContext.jsx";


function Loginpage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState(null);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });
      console.log("Login successful:", response.data);
       setUser(response.data);
       setRedirect(true);
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response) {
        console.error("Server responded with error:", error.response.data);
        setError(error.response.data.message || "Login failed");
      } else if (error.request) {
        console.error("No response received:", error.request);
        setError("No response received from the server");
      } else {
        console.error("Request setup error:", error.message);
        setError("Error setting up the request");
      }
    }
  };



  if (redirect) {
    return <Navigate to={"/account"} />;
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-2 ">Login</h1>
        {error && <p>Error: {error}</p>}
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="your@mail.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?
            <Link className="underline text-black" to={"/register"}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Loginpage;
