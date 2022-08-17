import axios from "axios";

const getBaseUrl = () =>{
    let url;

    switch(process.env.NODE_ENV){
        case 'production':
            url = process.env.REACT_APP_API_URL;
            break;
        case 'development':
            url = process.env.REACT_APP_API_URL_Local;
            break;
        default:
            url = undefined;
    }
    return url;
}

export default axios.create({
    baseURL: getBaseUrl(),
})