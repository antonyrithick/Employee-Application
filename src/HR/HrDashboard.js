import React, { useContext, useEffect } from "react";
import EmployeeContext from "../employees/Empcontext";
import "../sass/empapply.scss";
import axios from "axios";

export const HrDashboard = () => {
  const { data, setData } = useContext(EmployeeContext);

  useEffect(() => {
    axios.get("http://localhost:8000/hrdashboard")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, [setData]);

  const handleApproval = (eid) => {
    axios.post(`http://localhost:8000/approve`, { eid })
      .then((res) => {
        // Remove the approved employee from the data state
        setData(prevData => prevData.filter(employee => employee.eid !== eid));
      })
      .catch((err) => {
        console.error("Error approving leave:", err);
      });
  };

  const handleRejection = (eid) => {
    axios.post(`http://localhost:8000/reject`, { eid })
      .then((res) => {
        // Remove the rejected employee from the data state
        setData(prevData => prevData.filter(employee => employee.eid !== eid));
      })
      .catch((err) => {
        console.error("Error rejecting leave:", err);
      });
  };

  return (
    <div className="leave-approval">
      <h6>LEAVE APPROVAL</h6>
      <div>
        <table className="table table-striped container">
          <thead>
            <tr>
              <th>Name</th>
              <th>Employee ID</th>
              <th>Leave Start</th>
              <th>Leave End</th>
              <th>Days of Leave</th>
              <th>Leave Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((employee, index) => (
              <tr key={index}>
                <td>{employee.name}</td>
                <td>{employee.eid}</td>
                <td>{employee.leavestart}</td>
                <td>{employee.leaveend}</td>
                <td>{employee.leavedays}</td>
                <td>{employee.leavedes}</td>
                <td>
                  {employee.approval===1?<p className="text-success">Already Approved</p>:<div className="btn-group">
                    <button 
                      className="btn btn-success" 
                      onClick={() => handleApproval(employee.eid)}
                    >
                      Approve
                    </button>
                    <button 
                      className="btn btn-danger ms-2" 
                      onClick={() => handleRejection(employee.eid)}
                    >
                      Reject
                    </button>
                  </div>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
