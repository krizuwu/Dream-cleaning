
import AdminPage from "./adminPage";
import WorkerPage from "./WorkerPage";


const Dashboard = ({userData}) =>{

if(userData.userData.role === 0)
    return <AdminPage/>
if(userData.userData.role === 1)
    return <WorkerPage/>
}




export default Dashboard;