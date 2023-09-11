import React from "react";
import "./App.css";
import Login from "./components/login";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // for alert styling

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer position={"top-center"} autoClose={2000} />

        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
      {/* <Login /> */}
    </div>
  );
}

export default App;
