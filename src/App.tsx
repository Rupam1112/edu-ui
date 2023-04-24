import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import history from "./history";
import Login from "./login/login";
import ForgetPassword from "./forgetPassword";
import Dashboard from "./dashboard";
import User from "./user";
import School from "./school";
import Grade from "./grade";
function App() {
  return (
    // @ts-ignore
    <Router history={history}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user" element={<User />} />
        <Route path="/school" element={<School />} />
        <Route path="/grade" element={<Grade />} />
      </Routes>
    </Router>
  );
}

export default App;
