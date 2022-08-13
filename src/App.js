import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import Home from"./Pages/Home.js";
import Login from "./Pages/Login.js";
import Dashboard from "./Pages/DashBoard.js";
import authService from "./Services/auth.service.js";
import PortectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";


function App() {

  let [currentUser, setCurrentUser] = useState(undefined);
  

useEffect(() =>{
  let user =  authService.getCurrentUser();
  user.then(res =>{
    if(res != null){
      setCurrentUser(res);
      currentUser = res;
      return res;
    }
  })
}, []);

const logout = () => {
  authService.logout();
}

  return (
<Router>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={ <Login user={currentUser}/>  }></Route>
    <Route element = {<PortectedRoute Token={currentUser}/>}>
      <Route path="/dashboard"  element={ <Dashboard userData={currentUser} /> }></Route>
    </Route>
    
  </Routes>
</Router>
  );
}

export default App;
