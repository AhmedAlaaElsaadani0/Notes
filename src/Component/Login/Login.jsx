import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [user, setUser] = useState({ "email": "", "password": "" });
    const [error, setError] = useState("")  ;
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();
    function getData(e) {
        setUser({ ...user, [e.target.name]: e.target.value });

    }
    async function signIn(e){
        e.preventDefault();
        setLoading(true);
        let {data}=await axios.post('https://route-movies-api.vercel.app/signin',user);
        setLoading(false);
        if(data.message==='success'){
        localStorage.setItem('token',data.token);
            navigate('/Home');

        }
        else{
        setError(data.message);
    }
    }
    return <React.Fragment>
        <div className="container my-5 py-5">
            <div className="col-md-5 m-auto text-center">
                <form onSubmit={signIn}>
                    <div className="form-group">
                        <input onChange={getData} placeholder="Enter email" type="email" name="email" className="form-control" />
                    </div>
                    <div className="form-group my-2">
                        <input onChange={getData} placeholder="Enter you password" type="password" name="password" className=" form-control" />
                    </div>
                    
                    <button type="submit" className={`btn btn-info w-100 ${loading? "disabled": ""} `} > {loading?<i className='fa fa-spin fa-spinner'></i>:"Sign In"} </button>

                    {error && <div className="alert alert-danger my-2">{error}</div>}


                </form>
            </div>
        </div>


    </React.Fragment>
}
