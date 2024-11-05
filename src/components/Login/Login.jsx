
import React, {useState } from 'react'
import loginImg from '../../images/login-vector.png'
import { useNavigate } from 'react-router-dom'
import {fireStoreDb} from '../../firebase.config'
import { doc,getDoc} from 'firebase/firestore'
import { useMyContext } from '../../context/context'



const Login = () => {

const[password , setPassword] = useState()
const useMyContextData = useMyContext();
const{employeeId ,setEmployeeId} = useMyContextData ;
  

  const navigate = useNavigate()

  const handleLogin = async(e) => {
     e.preventDefault()
     localStorage.setItem("userEmployeeId" , employeeId) // setting the employee id entered by user to localStorage named userEmpyeeId

     try{

      //gettting the document which matches with entered employeeId
      const userDoc = await getDoc(doc(fireStoreDb, "Users", localStorage.getItem("userEmployeeId")));

            if (userDoc.exists()) {
                const userData = userDoc.data();
                const userPassword = userData.password; // Get the password associated with the employee ID

                if(userPassword === password) {
                  navigate('/profile');
                }
                else{
                  alert('you have entered wrong password')
                }

            } else {
                alert('No user found with this Employee ID');
            }
     }
     catch(err){
      console.log(err.message)
     }

  }

  return ( <>

    
    <div className="main-container">
      <form className='sub-container'>
  
        <div className='login-img-container row'>
          <img src={loginImg} alt="" width={500}/>
        </div>
        
        <div className='form-container row'>
          <h1 className='signup-heading'>Login to TicketNest</h1>
          <div className='input-container '>
            <input className="text-field" type='email' placeholder='Employee Id' name='employeeId' onChange={(e) => {setEmployeeId(e. target.value)}}/>
            <input className="text-field" type='password' placeholder='Password' name='password' onChange={(e) =>{setPassword(e.target.value)}}/>
            <button className='sign-up-btn' onClick={handleLogin}>Login</button>
            <div style={{alignSelf:'flex-end'}}>
              New User <a className='login-link' style={{cursor:'pointer'}} href='/'>Register here</a>
            </div>
          </div>
        </div>
          
      
      </form>
    </div>
    </>
  )
}

export default Login