import { createContext, useContext, useState } from "react";

const myContext = createContext();

export const useMyContext = () => {
    return useContext(myContext)
}

const ContextProvider = ({ children }) => {

    const[employeeId , setEmployeeId] = useState() ;
    const[userDetails , setUserDetails] = useState();
 
  
  return <myContext.Provider value={{employeeId , setEmployeeId , userDetails , setUserDetails }}>{children}</myContext.Provider>;
};


 export default ContextProvider
