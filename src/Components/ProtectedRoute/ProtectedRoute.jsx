import {Redirect, Route} from 'react-router-dom';
import {Outlet, Navigate} from 'react-router-dom'
import Login from '../../Pages/Login';


const PortectedRoute = ({Token}) =>{
    
    // if(!userData){
    //     return <Redirect to="/" ></Redirect>
    // }

    // return <Route {... props} />

    //return user != null ? <Outlet/> : <Navigate to="/"/>
    console.log("kk");
    return Token ?  <Outlet/> : <Login/>
}

export default PortectedRoute;