import { doc, getDoc} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { fireStoreDb1} from '../../firebase.config'
import Navbar from '../Navbar/Navbar'
import { useMyContext } from '../../context/context'


const Profile = () => {
    const useMyContextData = useMyContext()
    const{userDetails , setUserDetails} = useMyContextData;
    
    useEffect(()=> {
      fetchUserData()
    } , [])

    const fetchUserData = async() =>{
                 
           const docRef = doc(fireStoreDb1, "Users", localStorage.getItem('userEmployeeId'));
           const docSnap = await getDoc(docRef);
           if (docSnap.exists()) {
            setUserDetails(docSnap.data())
            console.log(docSnap.data())
           } else {
               console.log('no user data found')
           }
        }
   
    console.log(userDetails)
      
  return (
    <> 
    {userDetails && <Navbar />}
    </>
  )
}

export default Profile