
import AdminPage from "./adminPage";
import WorkerPage from "./WorkerPage";


const Dashboard = ({userData}) =>{

if(userData.userData.role === 0)
    return <AdminPage userData={userData}/>
if(userData.userData.role === 1)
    return <WorkerPage/>
}




export default Dashboard;