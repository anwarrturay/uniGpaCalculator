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
import RequireAuth from "./components/RequireAuth";
import PersistentLogin from "./components/PersistentLogin";
import ROLES_LIST from "./components/utils/Roles_List";
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
          {/* Public Routes */}
          <Route path="/" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>

          {/* Protected Routes */}
          <Route element={<PersistentLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES_LIST.USER]}/>}>
              <Route path="/studentdashboard" element={
                <StudentDashBoard isOpen={isOpen} setIsOpen={setIsOpen} handleClose={handleClose} />}
              />
            </Route>
          </Route>

          <Route element={<PersistentLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES_LIST.USER]} />}>
              <Route path="/newcalculation" element={
                <>
                  <Header isOpen={isOpen} setIsOpen={setIsOpen} handleClose={handleClose} />
                  <NewCalculation />
                </>}
              />
            </Route>
          </Route>

          <Route element={<PersistentLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES_LIST.USER]} />}>
              <Route path="/profile">
                <Route index element={<UserProfile />}></Route>
                <Route path="/profile/edit" element={<EditProfilePage/>}></Route>
              </Route>
            </Route>
          </Route>

        </Routes>
      )}
    </div>
  );
}

export default App;
