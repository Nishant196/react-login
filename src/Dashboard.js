import React from 'react';
import { getUser, removeUserSession } from './Utils/Common';

const Dashboard = (props) => {

    const user = getUser();

    const handleLogout = () => {
        removeUserSession();
        props.history.push('/login')
    }

    return (
        <div>
            Welcome {user.name}! <br/><br/>
            <input type="button" value="Logout" onClick={handleLogout} />
        </div>
    )
}

export default Dashboard;