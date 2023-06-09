import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Register() {
    const [user, setUser] = useState({ "first_name": "", "last_name": "", "email": "", "password": "" });
    const [error, setError] = useState("")  ;
    const [loading, setLoading] = useState(false);
    //navigate function
    let navigate = useNavigate();
    //get data from input and  useState to update user
    function getData({target}) {
       setUser({ ...user, [target.name]: target.value });

    }
    /**
     * signUp function
     * send data to server
     * to create new user
     */
    async function signUp(e){
        e.preventDefault();
        setLoading(true);
        let {data}=await axios.post('https://route-movies-api.vercel.app/signup',user);
        setLoading(false);
        if(data.message==='success'){
        navigate('/login');
        }
        else{
        setError(data.message);
    }
    }
    return <React.Fragment>


        <div className="container my-5 py-5">
            <div className="col-md-5 m-auto text-center">
                <form onSubmit={signUp} >
                    <div className="form-group">
                        <input onChange={getData} placeholder="Enter your name" name="first_name" type="text" className=" form-control" />
                    </div>
                    <div className="form-group my-2 ">
                        <input onChange={getData} placeholder="Enter your name" name="last_name" type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <input onChange={getData} placeholder="Enter email" type="email" name="email" className="form-control" />
                    </div>
                    <div className="form-group my-2">
                        <input onChange={getData} placeholder="Enter you password" type="password" name="password" className=" form-control" />
                    </div>
                    <button type="submit" className={`btn btn-info w-100 ${loading? "disabled": ""} `} > {loading?<i className='fa fa-spin fa-spinner'></i>:"SignUp"} </button>
                    {/* {error?<div className="alert alert-danger my-2">{error}</div>:null} */}
                    {error && <div className="alert alert-danger my-2">{error}</div>}


                </form>

            </div>
        </div>
    </React.Fragment >
}
