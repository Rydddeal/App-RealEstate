import React from "react";
import Header from "../src/Header.jsx";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="p-6 flex flex-col min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
