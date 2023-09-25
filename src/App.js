import React from "react";
import "./App.css";
import Login from "./components/login";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Accessories from "./components/accessories";
import NotAssignedAccessories from "./components/notassignedaccessories";
import AssignedAccessories from "./components/assignedaccessories";

import AddEmployees from "./components/addemployees";
import AddAccessories from "./components/addaccessories";
import Assign from "./components/assign";
import EmployeeName from "./components/employeename";
import Monitor from "./components/monitor";
import CPU from "./components/cpu";
import Mouse from "./components/mouse";
import Keyboard from "./components/keyboard";
import Chairs from "./components/chairs";

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
        <Routes>
          <Route
            path="/assignedaccessories"
            element={<AssignedAccessories />}
          />
        </Routes>
        <Routes>
          <Route
            path="/notassignedaccessories"
            element={<NotAssignedAccessories />}
          />
        </Routes>
        <Routes>
          <Route path="/addemployees" element={<AddEmployees />} />
        </Routes>
        <Routes>
          <Route path="/addaccessories" element={<AddAccessories />} />
        </Routes>
        <Routes>
          <Route path="/employeename" element={<EmployeeName />} />
        </Routes>
        <Routes>
          <Route path="/monitor" element={<Monitor />} />
        </Routes>
        <Routes>
          <Route path="/cpu" element={<CPU />} />
        </Routes>
        <Routes>
          <Route path="/mouse" element={<Mouse />} />
        </Routes>
        <Routes>
          <Route path="/keyboard" element={<Keyboard />} />
        </Routes>
        <Routes>
          <Route path="/chairs" element={<Chairs />} />
        </Routes>
        <Routes>
          <Route path="/assign" element={<Assign />} />
        </Routes>
      </BrowserRouter>
      {/* <Login /> */}
    </div>
  );
}

export default App;
