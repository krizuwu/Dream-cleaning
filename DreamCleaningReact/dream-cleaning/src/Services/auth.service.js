import axios from "axios";
import authHeader from './auth-header';
import {useNavigate} from 'react-router-dom';
const API_URL = "/api/gatekeepr/login";


const login = (username, password) => {
    return axios
    .post(process.env.REACT_APP_API_URL + API_URL,{
        username,
        password,
    })
    .then(response => {
        if(response.data.token){
            localStorage.setItem("user", JSON.stringify(response.data))
        }

        return response.data;
    })

}

const logout = () =>{
    localStorage.removeItem("user");
}

const getCurrentUser =  () =>{
    const userData = JSON.parse(localStorage.getItem("user"));
    const header = authHeader();
    return axios
    .get(process.env.REACT_APP_API_URL + API_URL + "/status",  {
        headers:{
            'Authorization' : header
        }
            
    })
    // .then(response => JSON.parse(response))
    .then(response => {
        if(response.data){
            return userData;
        }else{
            return null;
        }
    })
    .catch(error =>{
        console.log(error);
    })
}

const authService = {
    login,
    logout,
    getCurrentUser
}

export default authService;

