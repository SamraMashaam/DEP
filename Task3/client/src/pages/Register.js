import React, { useState } from "react";
import Layout from "../components/layout/layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    const submitHandle = async(e) =>{
      e.preventDefault();
      try {
        const res = await axios.post(`/api/v1/auth/register`, 
          {name, email, password, phone, address});
          if(res && res.data.success)
          {
            alert("Registered successfully :D ");
            navigate("/login");
          }
          else{
            alert(res.data.message);
          }
      } catch (error) {
        console.log(error);
        alert("Something went wrong :( ");
      }
    }

  return (
    <Layout>
        <div className="register">
          
        <div className="form-container ">
        <form onSubmit={submitHandle}>
          <h4 className="title">REGISTER</h4>
  <div className="mb-3">
  
    <input type="text"  value={name}  onChange={(e) => setName(e.target.value)} className="form-control" 
    id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter name' required/>
  </div>

  <div className="mb-3">
    <input type="text"  value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" 
    id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter phone number' required/>
  </div>

  <div className="mb-3">
    
    <input type="text"  value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" 
    id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter address' required/>
  </div>

  <div className="mb-3">
    
    <input type="email"  value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" 
    id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter email' required/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else :)</div>
  </div>
  
  <div className="mb-3">
    
    <input type="password"  value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" 
    id="exampleInputPassword1" placeholder='Enter password'required />
  </div>
 
  <button type="submit" className="pnf-btn">Submit</button>
</form>

        </div>
        </div>
    </Layout>
  )
}

export default Register