import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import SuperAdmin from "./components/SuperAdmin";
import Admin from "./components/Admin";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Auth />}></Route>
        <Route path="admin" element={<Admin />}></Route>
        <Route path="superadmin" element={<SuperAdmin />}></Route>
      </Routes>
    </div>
  );
}
