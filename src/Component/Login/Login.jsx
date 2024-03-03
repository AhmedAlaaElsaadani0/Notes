import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [user, setUser] = useState({ "email": "", "password": "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function getData(e) {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    
        // Email validation
        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isValidEmail = emailRegex.test(value);
            if (!isValidEmail) {
                setError('Please enter a valid email address');
            } else {
                setError('');
            }
        }
    
    
    }

    async function signIn(e) {
        e.preventDefault();
        
        // Basic validation: check if email and password are not empty
        if (!user.email || !user.password) {
            setError("Email and password are required");
            return;
        }

        setLoading(true);
        try {
            let { data } = await axios.post('https://note-sigma-black.vercel.app/api/v1/users/signIn', user);
            if (data.msg === 'done') {
                setLoading(false);
                localStorage.setItem('token',`3b8ny__${data.token}`);
                navigate('/Home');
            }
        } catch (error) {
            setLoading(false);
            setError(error.response.data.msg);
        }
    }

    return (
        <div className="container my-5 py-5">
            <div className="col-md-5 m-auto text-center">
                <form onSubmit={signIn}>
                    <div className="form-group">
                        <input onChange={getData} placeholder="Enter email" type="email" name="email" className="form-control" />
                    </div>
                    <div className="form-group my-2">
                        <input onChange={getData} placeholder="Enter your password" type="password" name="password" className="form-control" />
                    </div>

                    <button type="submit" className={`btn btn-info w-100 ${loading ? "disabled" : ""}`} disabled={loading}>
                        {loading ? <i className='fa fa-spin fa-spinner'></i> : "Sign In"}
                    </button>

                    {error && <div className="alert alert-danger my-2">{error}</div>}
                </form>
            </div>
        </div>
    );
}
