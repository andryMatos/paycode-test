import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from './components/Login';
import Missing from './components/Missing';
import { PrivateRoute } from "./components/PrivateRoute";
import { Dashboard } from "./components/Dashboard";

export const App = () => {
  return(
      <Routes>
          {/* public routes */}
          <Route path="/" element={<Login/>}/>
          {/* Protected routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard/>}/>
          </Route>
          <Route path="*" element={<Missing />} />
      </Routes>
  );
}
