import React from "react";
import Header from "./components/Header";
import { Routes,Route } from "react-router-dom";
import { useState } from "react";
import NewCalculation from "./components/NewCalculation";
import StudentDashBoard from "./components/StudentDashBoard";
import Login from "./components/Login";
import Signup from "./components/SignUp";
function App() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);
  return (
    <div className="flex justify-center">
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/studentdashboard" element={
          <StudentDashBoard isOpen={isOpen} setIsOpen={setIsOpen} handleClose={handleClose} />}
        />
        <Route path="/newcalculation" element={
          <>
            <Header isOpen={isOpen} setIsOpen={setIsOpen} handleClose={handleClose} />
            <NewCalculation />
          </>}
        />
      </Routes>

    </div>
  );
}

export default App;
