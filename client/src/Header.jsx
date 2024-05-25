import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../src/User/UserContext.jsx";

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <header className="flex justify-between">
        <Link to="/" className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
          <span className="font-bold text-xl">HV-H</span>
        </Link>
        <div className="flex border border-gray-300 rounded-full w-120 padding py-2 px-8 shadow-md shadow-gray-200">
          <div className="font-bold text-sm padding py-1 px-3">Anywhere</div>
          <div className="border-l border-gray-300"></div>
          <div className="font-bold text-sm padding py-1 px-3">Any week</div>
          <div className="border-l border-gray-300"></div>
          <div className="font-bold text-sm padding py-1 px-3">Add guests</div>
          <div className="border-gray-300 padding py-1 px-3"></div>
          <button className="bg-primary text-white p-1 rounded-full w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>
        <Link
          to={user ? "/account" : "/login"}
          className="flex items-center gap-1.5 border border-gray-300 rounded-full padding py-2 px-4 shadow-md shadow-gray-300"
        >
          {user ? user.name : "Login"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
          <div className="bg-gray-500 text-white rounded-full border-gray-200 overflow-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
              style={{ relativeTop: 1 }}
            >
              <path
                fillRule="evenodd"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </div>
        </Link>
      </header>
    </div>
  );
};

export default Header;
