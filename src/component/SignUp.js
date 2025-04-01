import React, { useState } from 'react';
import { useNavigate } from "react-router";


function SignUp() {
  const host = "http://localhost:3001";
  let navigate = useNavigate();

  const [input, setInput] = useState({ name: "", email: "", address: "", mobile: "", city: "", password: "" });

  const handleChangeSubmit = async (event) => {
    event.preventDefault();

    // signup
    const response = await fetch(`${host}/user/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: input.name, email: input.email, address: input.address, mobile: input.mobile, city: input.city, password: input.password }),
    });
    const json = await response.json();
    // console.log(json)
    // console.log(setNotes())
    localStorage.setItem("token", json.token);
    navigate("/Home");


  };

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setInput({ ...input, [name]: value });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleChangeSubmit}>
          <div className="mb-3">
            <label className="form-label">name</label>
            <input type="text" className="form-control" name="name" onChange={handleInput} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" onChange={handleInput} />
          </div>
          <div className="mb-3">
            <label className="form-label"> address</label>
            <input type="text" className="form-control" name="address" onChange={handleInput} />
          </div>
          <div className="mb-3">
            <label className="form-label">mobile</label>
            <input type="number" className="form-control" name="mobile" onChange={handleInput} />
          </div>
          <div className="mb-3">
            <label className="form-label">city</label>
            <select name="city" onChange={handleInput} className="form-control">
              <option value="">select city</option>
              <option value="surat">surat</option>
              <option value="mumbai">mumbai</option>
              <option value="rajkot">rajkot</option>
              <option value="goa">goa</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name="password" onChange={handleInput} autoComplete="on" />
          </div>

          <button type="submit" className="btn btn-primary" >SignUp</button>
        </form>
      </div>
    </>

  );
}

export default SignUp;