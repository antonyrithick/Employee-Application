import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../sass/status.scss";

export const StatusCheck = () => {
  const navigate = useNavigate();
  const [eid, setEId] = useState("");
  const [statusData, setStatusData] = useState(null);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    if (search) {
      axios.get(`http://localhost:8000/status/${eid}`)
        .then((res) => setStatusData(res.data))
        .catch(() => console.log("error"));
      setSearch(false); // Reset search to prevent infinite loop
    }
  }, [search, eid]);

  return (
    <div>
      <div className='bg-dark d-flex justify-content-center'>
        <h4 className='text-light text-center'>Application Status</h4>
      </div>
      <button className='btn btn-danger' onClick={() => navigate("/")}>Back</button>
      <div className='d-flex justify-content-center'>
        <input 
          type='search' 
          name='search' 
          className='m-2 p-2 w-50' 
          placeholder='Enter your Employee ID' 
          onChange={(e) => setEId(e.target.value)} 
        />
        <button 
          className='btn btn-primary ps-4 pe-4' 
          onClick={() => setSearch(true)}
        >
          Search
        </button>
      </div>
      <div className='bg-light' style={{height:"auto"}}>
        {statusData ? (
          <div className='container status'>
          <p className=''>Employee Name:<span> {statusData.name}</span></p>
          <p className=''>Employee ID:<span> {statusData.eid}</span></p>
          <p className=''>LEAVE START:<span> {statusData.leavestart}</span></p>
          <p className=''>LEAVE END:<span> {statusData.leaveend}</span></p>
          <p className=''>LEAVE DAYS:<span> {statusData.leavedays}</span></p>
          <p className=''>LEAVE DESCRIPTION:<span> {statusData.leavedes}</span></p>
          <p className='status-ui'>APPROVAL STATUS:<span > {statusData.approval===0?<p className='pending'> Pending... </p>:<p className='approval'>APPROVED</p>}</span></p>
          </div>
        ) : (
          <p className='text-center pt-5'>No data Found...</p>
        )}
      </div>
    </div>
  );
}
