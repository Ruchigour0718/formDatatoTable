import "./App.css";
import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Navbar from "./component/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import Dashboard from "./component/Dashboard";
import FormData from "./component/FormData";
import EditData from "./component/EditData";
import Update from "./component/Update";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/formdata" element={<FormData />} />
          <Route path="/edit/users/:id" element={<EditData />} />
          <Route path="/update" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
