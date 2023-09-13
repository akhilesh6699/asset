import React from "react";
import "./App.css";
import Login from "./components/login";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Accessories from "./components/accessories";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // for alert styling
import Employees from "./components/employees";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer position={"top-center"} autoClose={1000} />

        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Routes>
          <Route path="/employees" element={<Employees />} />
        </Routes>
        <Routes>
          <Route path="/accessories" element={<Accessories />} />
        </Routes>
      </BrowserRouter>
      {/* <Login /> */}
    </div>
  );
}

export default App;
