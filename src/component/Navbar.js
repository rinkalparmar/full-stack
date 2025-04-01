import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark sticky-sm-top">
                <div className="container-fluid">
                    <Link className="navbar-brand text-white" to="/Home">NoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link text-white " aria-current="page" to="/Home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/About">AboutUs</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/Contact">ContactUs</Link>
                            </li>

                        </ul>
                    </div>
                    {
                        !localStorage.getItem("token") ? (
                            <div>
                                <Link className="btn btn-primary mx-2" to="/Login">Login</Link>
                                <Link className="btn btn-primary" to="/SignUp">SignUp</Link>
                            </div>
                        ) : (
                            <Link className="btn btn-primary" to="/LogOut">LogOut</Link>
                        )
                    }
                </div>
            </nav>
        </>
    );
}

export default Navbar;