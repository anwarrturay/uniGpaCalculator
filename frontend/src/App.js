import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Loading from "./components/utils/Loading";
import RequireAuth from "./components/RequireAuth";
import PersistentLogin from "./components/PersistentLogin";
import ROLES_LIST from "./components/utils/Roles_List";

import NewCalculation from "./components/NewCalculation";
import StudentDashBoard from "./components/StudentDashBoard";
import UserProfile from "./components/UserProfile";
import EditProfilePage from "./components/EditProfilePage";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setIsOpen(false);

  return (
    <div className="flex justify-center">
      {isLoading ? (
        <Loading />
      ) : (
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Routes */}
          <Route element={<PersistentLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES_LIST.USER]} />}>

              <Route path="/studentdashboard" element={
                <StudentDashBoard isOpen={isOpen} setIsOpen={setIsOpen} handleClose={handleClose} />
              } />

              <Route path="/newcalculation" element={
                <>
                  <Header isOpen={isOpen} setIsOpen={setIsOpen} handleClose={handleClose} />
                  <NewCalculation />
                </>
              } />

              <Route path="/profile" element={<UserProfile />} />
              <Route path="/profile/edit" element={<EditProfilePage />} />

            </Route>
          </Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
