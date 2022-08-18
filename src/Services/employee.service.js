import authHeader from './auth-header';
import http from "./http";
const API_EMPLOYEE_URL = "/api/castle/employees";

const post = (EmployeeCreateModel) =>{
    return http
    .post(API_EMPLOYEE_URL,
        EmployeeCreateModel,
        {
            headers:{
                'Authorization' : authHeader(),
            }
        })
        .then(response =>{
            console.log(response);
        })
        .catch(error =>{
            console.log(error);
        })
}

const EmployeeService = {
    post
}

export default EmployeeService;