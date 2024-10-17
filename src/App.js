import React from "react";
import Header from "./components/Header";
import DashBoard from "./components/DashBoard";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import NewCalculation from "./components/NewCalculation";

function App() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);
  return (
    <div className="App">

      {location.pathname === '/studentdashboard' &&  <Header isOpen={isOpen} setIsOpen={setIsOpen} handleClose={handleClose}/>}

      {location.pathname === '/studentdashboard' && <DashBoard isOpen={isOpen} setIsOpen={setIsOpen} /> }
      {
        location.pathname === '/newcalculation' && 
        <>
          <Header isOpen={isOpen} setIsOpen={setIsOpen} handleClose={handleClose}/>
          <NewCalculation />
        </>
      }
    </div>
  );
}

export default App;
