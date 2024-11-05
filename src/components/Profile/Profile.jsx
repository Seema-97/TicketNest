import { doc, getDoc} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { auth, fireStoreDb } from '../../firebase.config'
import { useNavigate } from 'react-router-dom'





const Profile = () => {
    const[userDetails , setUserDetails] = useState();
  
 
    useEffect(()=> {
      fetchUserData()
    } , [])

    const fetchUserData = () =>{
        auth.onAuthStateChanged(async(user)=>{
           console.log(user)
          
           const docRef = doc(fireStoreDb, "Users", localStorage.getItem('userEmployeeId'));
           const docSnap = await getDoc(docRef);
           if (docSnap.exists()) {
            setUserDetails(docSnap.data())
            console.log(docSnap.data())
           } else {
               console.log('no user data found')
               // docSnap.data() will be undefined in this case
               // console.log("No such document!");
           }
        })
    }
      
    const navigate = useNavigate()

    // const handleLogout = async() => {
    //    try{
    //     await auth.signOut();
    //     navigate('/login')
    //    }
    //    catch(error){
    //     console.log(error.message)
    //    }

    // }

  return (
    <>
    {userDetails?.isAuthorisedField === 'pending'?( <div><p>Hi.. {userDetails && userDetails.firstname} your account approval is pending</p> </div> ): <div><p>Welcome {userDetails && userDetails.firstname} to client portal.</p> </div>}
   
   
    </>
  )
}

export default Profile