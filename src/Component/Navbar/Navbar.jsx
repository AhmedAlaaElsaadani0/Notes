import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
    let token = localStorage.getItem('token');
    // navigate function
    let naviga = useNavigate();

    // log out function
    function logOut() {
        localStorage.clear();
        naviga('/login');
    }
    return <React.Fragment>
        {/* navBar */}
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container">
                <Link className="navbar-brand fa-2x" to="/"> <i class="fa-solid fa-note-sticky fa-beat-fade fa-sm"></i> Notes</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {token ?
                            <li className="nav-item">
                                <span className="nav-link fa-2x"onClick={logOut} style={{cursor:'pointer'}} >Log out</span>
                            </li>

                            : <>
                                <li className="nav-item">
                                    <Link to="register" className="nav-link fa-2x">Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="login" className="nav-link fa-2x">Login</Link>
                                </li>
                                </>}
                    </ul>
                </div>
            </div>
        </nav>


    </React.Fragment>
}
