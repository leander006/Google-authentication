import axios from 'axios';
import React from 'react'

function Home() {
  const logout =() =>{
      window.open("http://localhost:8000/auth/logout", "_self");
  }
  

  return (
    <div className='container'>
          <h1 className='text-success'>You have successfully login through google authentication</h1>
          <div className='container mx-auto my-auto'>

      <div className='d-flex bg-danger text-white my-5' onClick={logout} style={{cursor:"pointer"}}>
      <i class="fa-solid fa-2xl pt-4 mx-2  fa-arrow-right-from-bracket"></i>
      <h1 >Logout</h1>
      </div>
      </div>
    </div>
  )
}

export default Home