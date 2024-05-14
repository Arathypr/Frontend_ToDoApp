import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import BrowserRouter, Routes, and Route
import Login from "./components/Login";
import Homepage from "./components/Homepage";
import ToDoList from "./components/ToDoList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/todoList" element={<ToDoList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
