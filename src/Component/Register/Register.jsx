import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [user, setUser] = useState({ "name": "", "age": "", "phone": "", "email": "", "password": "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    function getData(e) {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });

        // Validation for each input
        const errorsCopy = { ...errors };
        switch (name) {
            case 'name':
                errorsCopy[name] = value.length < 3 ? 'Name must be at least 3 characters long' : '';
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                errorsCopy[name] = !emailRegex.test(value) ? 'Please enter a valid email address' : '';
                break;
            case 'age':
                errorsCopy[name] = isNaN(value) && value > 10 ? 'Age must be a number and more than 10' : '';
                break;
            case 'phone':
                errorsCopy[name] = value.length < 10 ? 'Phone number must be 10 digits long' : '';
                break;
            case 'password':
                errorsCopy[name] = value.length < 6 ? 'Password must be at least 6 characters long' : '';
                break;
            default:
                break;
        }
        setErrors(errorsCopy);
    }


    function handleChangeAge(e) {
        // Allow only digits and prevent negative sign
        const currentValue = e.target.value;
        if (currentValue >= 0 && !isNaN(Number(currentValue)) ) {
            e.preventDefault();
            getData(e);
        }
        else{
            e.target.value="";
        }
    }
    async function signUp(e) {
        e.preventDefault();
        setLoading(true);
        //Here we are checking if there are any errors in the form
        try {
            let { data } = await axios.post('https://note-sigma-black.vercel.app/api/v1/users/signUp', user);
            if (data.msg === 'done') {
                setLoading(false);
                navigate('/login');
            }
        } catch (error) {
            setLoading(false);
            setErrors({ ...errors, 'email': error.response.data.msg });
        }
    }

    return (
        <div className="container my-5 py-5">
            <div className="col-md-5 m-auto text-center">
                <form onSubmit={signUp}>
                    <div className="form-group mt-2">
                        <input onChange={getData} placeholder="Enter your name" name="name" type="text" className="form-control" />
                        {errors.name && <div className="text-danger">{errors.name}</div>}
                    </div>
                    <div className="form-group mt-2">
                        <input onChange={getData} placeholder="Enter email" type="email" name="email" className="form-control" />
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>
                    <div className="form-group mt-2">
                        <input onChange={(e) => {
                            handleChangeAge(e);
                        }}  placeholder="Enter age" type="number" name="age" className="form-control" />
                        {errors.age && <div className="text-danger">{errors.age}</div>}
                    </div>
                    <div className="form-group mt-2">
                        <input onChange={getData} placeholder="Enter phone" type="text" name="phone" className="form-control" />
                        {errors.phone && <div className="text-danger">{errors.phone}</div>}
                    </div>
                    <div className="form-group mt-2">
                        <input onChange={getData} placeholder="Enter your password" type="password" name="password" className="form-control" />
                        {errors.password && <div className="text-danger">{errors.password}</div>}
                    </div>
                    <button type="submit" className={`btn btn-info w-100 ${loading ? "disabled" : ""}`} disabled={loading}>
                        {loading ? <i className='fa fa-spin fa-spinner'></i> : "Sign Up"}
                    </button>
                    {errors.email && <div className="alert alert-danger my-2">{errors.email}</div>}
                </form>
            </div>
        </div>
    );
}
