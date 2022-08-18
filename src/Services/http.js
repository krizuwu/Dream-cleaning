import axios from "axios";

const getBaseUrl = () =>{
    let url = "";
    console.log(proq.env.NODE_ENV);
    switch(process.env.NODE_ENV){
        case 'production':
            url = process.env.REACT_APP_API_URL;
            console.log(url);
            break;
        case 'development':
            url = process.env.REACT_APP_API_URL_Local;
            break;
        default:
            url = undefined;
    }
    console.log(url);
    return url;
}

export default axios.create({
    baseURL: getBaseUrl(),
})