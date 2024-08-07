import React, { useContext, useState } from 'react';
import "../sass/empapply.scss";
import { Navigate, useNavigate } from 'react-router-dom';
import EmployeeContext from './Empcontext';
import axios from 'axios';
import check from "../images/web.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const EmpApply = () => {
  const navigate = useNavigate("");

 const [data,setData] = useState([]);
 const [display,setDisplay] = useState(false);


 

 function Leaveok(e) {
   e.preventDefault();

   
   axios.post("http://localhost:8000/empleaveapply", data)
     .then((res) => {
       console.log("Application submitted... status pending");
       toast("Thanks for Applying...")
       setData({
      name : '',
      eid : '',
      leavestart : '',
      leaveend : '',
      leavedes : '',
      leavedays: ''
    })
    
    

  
       
     })
     .catch((err) => {
       console.error("Error submitting application", err);
     });
 }
 

  function handleReset(){
    setData({
      name : '',
      eid : '',
      leavestart : '',
      leaveend : '',
      leavedes : '',
      leavedays: ''
    })
  }
   

   return (
      <div>
         <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
         <div className='emp-apply container' style={{height:"100dvh"}}>
            <h2>LEAVE APPLICATION FORM</h2>
            <div className='d-flex justify-content-center'>
            
               <form className='col-6' onSubmit={Leaveok} >
                  <div className='form-group'>
                     <label htmlFor="name" className='form-label'>Your Name*</label>
                     <input
                        type='text'
                        className='form-control'
                        value={data.name}
                        onChange={(e)=>setData({...data,name:e.target.value})}
                        name='name'
                        required
                     />
                  </div>
                  <div className='form-group'>
                     <label htmlFor="eid" className='form-label'>Your Employee ID*</label>
                     <input
                        type='text'
                        className='form-control'
                       value={data.eid}
                       onChange={(e)=>setData({...data,eid:e.target.value})}
                        name='eid'
                        required
                     />
                  </div> 

                  <div className='date-group'>
                  <div className='form-group'>
                     <label htmlFor="date" className='form-label'>Leave Start Date*</label>
                     <input
                        type='date'
                        className='form-control'
                       value={data.leavestart}
                       onChange={(e)=>setData({...data,leavestart:e.target.value})}
                        name='leavestart'
                        required
                     />
                  </div>
                  <div className='form-group'>
                     <label htmlFor="date" className='form-label'>Leave End Date*</label>
                     <input
                        type='date'
                        className='form-control'
                       value={data.leaveend}
                       onChange={(e)=>setData({...data,leaveend:e.target.value})}
                        name='leaveend'
                        required
                     />
                  </div>
                  </div>
                  <div className='form-group'>
                     <label htmlFor="leave" className='form-label'>How many days you want to Leave *</label>
                     <input
                        type='number'
                        className='form-control'
                        value={data.leavedays}
                        onChange={(e)=>setData({...data,leavedays:e.target.value})}
                        name='leavedays'
                        required
                     />
                  </div>
                  <div className='form-group'>
                     <label htmlFor="leavedes" className='form-label'>What is the purpose of the Leave *</label>
                     <textarea
                        type='textarea'
                        className='form-control'
                        value={data.leavedes}
                        onChange={(e)=>setData({...data,leavedes:e.target.value})}
                        name='leavedes'
                        required
                     />
                  </div>
                  <div className='btn-group'>
                     <button type='submit' className='btn btn-primary'>Apply Leave</button>
                     <button type='button' className='btn btn-danger ms-5' onClick={handleReset}>Reset</button>
                  </div>
               </form>
               <div className='d-flex justify-content-center align-items-center ps-5'><div className=' ps-5d-flex flex-column align-items-center gap-4' style={{background:"lightblue", padding:"20px"}}>
                  <img src={check} alt='logo' width={80} height={80} />
                  <button className='btn btn-success' onClick={()=>navigate("/status")}>Check Application Status</button></div></div>
            
            </div>
         </div>
         
      </div>
   );
};
