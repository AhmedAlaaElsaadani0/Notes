import React from 'react'
import Home from '../Home/Home'
import Login from '../Login/Login'
import jwtDecode from 'jwt-decode';

export default function ProtectedRout() {
    //check if user is logged in
    let token = localStorage.getItem('token');
    if(token != undefined){
        try {
            const decodedToken = jwtDecode(token);
            return<Home/>
          } catch (error) {
            return<Login/>
          }
        
    }
    else{
        return<Login/>

    }
  

}
