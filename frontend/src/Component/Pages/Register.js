import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Register() {
      const [name, setName] = useState("")
      const [email, setEmail] = useState("")
      const [pass, setPass] = useState("")
      const navigate = useNavigate();
      const register=async(e)=>{
            e.preventDefault();
            try {
              const {data} = await axios.post("http://localhost:8000/auth",{
                username:name,
                email,
                password:pass
              })
              console.log("res inside frontend",data.message);
              navigate("login")
            } catch (error) {
              console.log(error.response.data.message);
            }
      }

      const google = (e) =>{
        e.preventDefault();
          window.open("http://localhost:8000/auth/google","_self")
      }
  return (

    <div className='container d-flex justify-content-evenly '>
    <div className='container mx-auto my-auto'>
      <div className='d-flex bg-danger text-white my-5' onClick={google} style={{cursor:"pointer"}}>
      <i className="fa-brands fa-2xl pt-4 mx-2 fa-google"></i>
      <h1 >Google</h1>
      </div>
      </div>


      <form className='container mx-auto my-auto '>
      <div className="mb-3">
    <label for="exampleInputText1" className="form-label" >Username</label>
    <input type="text" className="form-control" value={name} onChange={e=>setName(e.target.value)} id="exampleInputText1" aria-describedby="textHelp"/>
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" value={pass} onChange={e=>setPass(e.target.value)}id="exampleInputPassword1"/>
  </div>
  <button type="submit" onClick={register} className="btn btn-primary">Submit</button>
</form>


    </div>
  )
}

export default Register