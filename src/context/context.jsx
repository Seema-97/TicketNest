import { createContext, useContext, useEffect, useState } from "react";

const myContext = createContext();

export const useMyContext = () => {
    return useContext(myContext)
}

const ContextProvider = ({ children }) => {

    const[employeeId , setEmployeeId] = useState() ;

    // useEffect(
    //     () => {
    //        localStorage.setItem("employeeId" , employeeId)
    //     } , [employeeId]
    // )

  return <myContext.Provider value={{employeeId , setEmployeeId}}>{children}</myContext.Provider>;
};


 export default ContextProvider
