import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './Utils/Common';

const Login = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setError(null);
        setLoading(true);
        axios.post("http://localhost:4000/users/signin", {
            username: username,
            password: password
        }).then(response => {
            setLoading(false);
            setUserSession(response.data.token, response.data.user)
            props.history.push('/dashboard');
            // console.log('response >>> ', response);
        }).catch(error => {
            setLoading(false);
            if(error.response.status === 401 || error.response.status === 400){
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. try again later")
            }
            // console.log('error >>> ', error);
        })
    }

    return (
        <div>
            Login <br/> <br/>
            <div>
                Username <br/>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div>
                Password <br/>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div><br/>
            {error && <div className="error">{error}</div>}
            <input type="button" value={loading ? "Loading..." : "Login"} disable={loading} onClick={handleLogin} />
        </div>
    )
}

export default Login;