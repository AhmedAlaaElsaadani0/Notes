import React from 'react'
import Home from '../Home/Home.jsx'
import jwtDecode from 'jwt-decode';
import Register from '../Register/Register.jsx';

//This component is used to check if the user is logged in or not
export default function RegisterProtectedRouter() {
    let token = localStorage.getItem('token');
    //check if user is logged out
 
    if(token != undefined){
        try {
            const decodedToken = jwtDecode(token);
            return<Home/>
          } catch (error) {
            return<Register/>
          }
        
    }
    else{
        return<Register/>

    }

}
