import React from 'react'
import { useNavigate } from 'react-router-dom';
import "../sass/emphome.scss";
import emp from "../images/svsm.jpg";


export const DashBoard = () => {
    const navigate =useNavigate("/");
  return (
    <>
    <div className='emp-home'>
    <div className='header'>
      <h4 className='text-center text-primary p-4 bg-light'>Employee DashBoard</h4>
    </div>

<div className='title'>
    <img src={emp} alt='employees' />
    </div>
    <div className='d-flex justify-content-around align-items-center'>

     
            <button className='btn btn-success' onClick={()=>{navigate("/empapply")}} >Leave Apply</button>
            <button className='btn btn-primary' onClick={()=>{navigate("/status")}} >check application status</button>




            </div>   
<div className='footer-content'>
            <footer><p>developed by <span className=''> Antony Rithick</span></p></footer> 
            </div>
            </div>      
  
    </>
  )
}
