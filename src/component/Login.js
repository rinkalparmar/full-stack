import React, { useState } from 'react';
import { useNavigate } from "react-router";

function Login() {

    const [input, setInput] = useState("");
    const host = "http://localhost:3001";
    let navigate = useNavigate();



    const handleChangeSubmit = async (event) => {
        event.preventDefault();

        // login
        const response = await fetch(`${host}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: input.email, password: input.password }),
        });
        const json=await response.json();
        // console.log(json)
        // console.log(setNotes())
        if(json.success)
        {
            localStorage.setItem("token",json.token)
            navigate("/Home");
        }
        else
        {
            navigate("/Login");

        }
    };

    const handleInput = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setInput((input) => ({ ...input, [name]: value }));


    };

    return (
        <>
            <div className="container">
                <form onSubmit={handleChangeSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" name="email" onChange={handleInput} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" onChange={handleInput} autoComplete="on"/>
                    </div>

                    <button type="submit" className="btn btn-primary" >Login</button>
                </form>
            </div>
        </>
    );
}

export default Login;