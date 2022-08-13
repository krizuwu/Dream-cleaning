import React from 'react';
import LoginForm from "../Components/LoginForm/LoginForm"
import Dashboard from './DashBoard';



function Login({user}) {

    if(user){
    //     navigate("/dashboard");
    //   window.location.reload();
        return <Dashboard userData={user}/>;
    }else{
        return <LoginForm/>;
    }
  }
  
  export default Login;