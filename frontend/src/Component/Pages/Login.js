import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom';
import axios from "axios";
function Login() {

      const [name, setName] = useState("")
      const [pass, setPass] = useState("")
      const navigate = useNavigate();
      const login =async(e)=>{
            e.preventDefault();
            try {
              const { data}  = await axios.post("http://localhost:8000/users",{
                username:name,
                password:pass
              })
              console.log(data);
              navigate("/home");
            } catch (error) {
             console.log(error.response.data.message);
            }
      }
      const google = (e) =>{
        e.preventDefault();
          window.open("http://localhost:8000/auth/google","_self")
      }
      
  return (
    <div className='container d-flex justify-content-evenly'>
      
      <div className='container mx-auto my-auto'>
      <div className='d-flex bg-danger text-white my-5' onClick={google} style={{cursor:"pointer"}}>
      <i className="fa-brands fa-2xl pt-4 mx-2 fa-google"></i>
      <h1 >Google</h1>
      </div>
      </div>

      <form className='container my-auto' >
      <div className="mb-3">
    <label for="exampleInputText1" className="form-label" >Username</label>
    <input type="text" className="form-control" value={name} onChange={e=>setName(e.target.value)} id="exampleInputText1" aria-describedby="textHelp"/>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" value={pass} className="form-control"onChange={e=>setPass(e.target.value)}id="exampleInputPassword1"/>
  </div>
  <button type="submit" onClick={login} className="btn btn-primary">Submit</button>
</form>

    </div>
  )
}

export default Login