import React, { createContext, useState } from 'react';

const EmployeeContext = createContext();

export const EmpProvider = ({ children }) => {
  const [data, setData] = useState([]);

  return (
    <EmployeeContext.Provider value={{ data, setData }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeContext;
