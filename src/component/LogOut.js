import React from 'react';
import { useNavigate } from "react-router";


const LogOut = async () => {
    const host = "http://localhost:3001";
    let navigate = useNavigate();
    // login
    const response = await fetch(`${host}/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: input.email, password: input.password }),
    });
    const json = await response.json();
    // console.log(json)
    // console.log(setNotes())
    if (json.success) {
        localStorage.removeItem("token", json.token);
        navigate("/Login");
    }
    return (
        <>

        </>
    );
};

export default LogOut;