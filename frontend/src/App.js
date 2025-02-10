import React, {useEffect} from "react";
import Header from "./components/Header";
import { Routes,Route } from "react-router-dom";
import { useState } from "react";
import NewCalculation from "./components/NewCalculation";
import StudentDashBoard from "./components/StudentDashBoard";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import UserProfile from "./components/UserProfile"
import EditProfilePage from "./components/EditProfilePage";
import Loading from "./components/utils/Loading";
function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false after some time
    }, 3000); // Simulate a 3-second delay

    return () => clearTimeout(timer); // Cleanup timer
  }, []);
  
  const handleClose = () => setIsOpen(false);
  return (
    <div className="flex justify-center">
      { isLoading ? (
        <Loading />
      ) : (
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
          <Route path="/profile">
            <Route index element={<UserProfile />}></Route>
            <Route path="/profile/edit" element={<EditProfilePage/>}></Route>
          </Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
