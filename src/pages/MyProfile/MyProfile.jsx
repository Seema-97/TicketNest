import React, { useState } from 'react'
import { useMyContext } from '../../context/context'
import { Box, Button, Divider, FormControl, IconButton, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableRow, TextField,} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { doc, updateDoc } from 'firebase/firestore';
import { fireStoreDb1 } from '../../firebase.config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase.config';


const MyProfile = () => {
  const [categoryValue, setCategoryValue] = useState('');
  const[designationValue , setDesignationValue] = useState('');
  const[isEditing , setIsEditing] = useState(false)
 
  const[filledUserDetails , setFilledUserDetails] = useState({
    contact:'',
    doj:'',
    designation:'',
    category:''
  })
 
  const designations = ['Human Resources', 'Technical Support', 'Financne/Accounting', 'Sales' , 'Marketing' , 'Product Management' , 'Admin' , 'Trainig / Learning & development' , 'Quality Assurance'];
  const categories = ['Network', 'Hardware', 'Software', 'UPS' , 'Others'];


  const useMyContextData = useMyContext()
  const{userDetails , setUserDetails} = useMyContextData ;

  
  const handleChange =(e)=>{
    const{name,value} = e.target
    setFilledUserDetails((prev) => {
      return{
        ...prev,
        [name]:value
      }
    })
  }

  const handleDesignation = (e) => {
    setDesignationValue(e.target.value)
 }

  const handleCategory = (e) => {
     setCategoryValue(e.target.value)
  }


  const handleProfileSubmit = async (e) => {
    e.preventDefault();
   
    const userEmployeeId = userDetails.employeeId;  
    
    // Merge the filled user details with the existing userDetails
    const updatedUserDetails = isEditing ? {...userDetails} : {
      ...userDetails,           // Keep the existing user data
      ...filledUserDetails ,  //add newly filled data
     profileCompeleted : true
    };
  
    try {
      // Get the user document reference from Firestore
      const userRef = doc(fireStoreDb1, "Users", userEmployeeId);  // 'users' is the collection, 'userId' is the document ID
  
      // Update the user document with the new data
      await updateDoc(userRef, updatedUserDetails);
      setUserDetails(updatedUserDetails);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }


 }

 const editContact = () =>{
    setIsEditing(true);
 }
  
 const handleContactChange = (e) => {
   setUserDetails(prev => {
    return {
      ...prev,
      contact:e.target.value
    }
   })
 }

//  console.log(userDetails)

 //code for profile pic
 const [profilePic, setProfilePic] = useState('');
   const [loading, setLoading] = useState(false); // To handle loading state
   const [error, setError] = useState(null); // To handle any errors
  //  const [imageURL, setImageURL] = useState(''); // To store the image URL
 
   const handleFileChange = (e) => {
     const file = e.target.files[0];
     if (file) {
       setProfilePic(file);
     } else {
       setProfilePic(null);
     }
   };

   console.log(profilePic);
 
   const imageURL = JSON.parse(localStorage.getItem('userImageURL')) || ''
    const uploadProfilePic = () => {
     if (!profilePic) {
       setError('Please select a file to upload');
       return;
     }
 
     setError(null); // Reset error message
     setLoading(true); // Start loading
   
     const storageRef = ref(storage, `profilePic/${profilePic.name + Date.now()}`);
 
     uploadBytes(storageRef, profilePic)
       .then((snapshot) => {
         console.log('Uploaded a file', snapshot);
         // Get the download URL after the upload completes
         getDownloadURL(snapshot.ref)
           .then((url) => {
             localStorage.setItem('userImageURL' , JSON.stringify(url)) // store the image URL in localStorage
             setLoading(false); // Stop loading
           })
           .catch((err) => {
             setLoading(false);
             setError('Failed to retrieve image URL');
             console.error('Error getting download URL:', err);
           });
       })
       .catch((err) => {
         setLoading(false); // Stop loading on error
         setError('Upload failed. Please try again.');
         console.error('Error uploading file:', err);
       });
   };
 

  // console.log(userDetails)
  console.log(imageURL)

  return (
    <>
    <Box component={Paper} sx={{ width: "80%", height: 'fit-content', padding: '40px 50px', boxShadow: ' rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset !important', borderRadius: '15px' }}>
        {((!userDetails.profileCompeleted)) ? (
          <>
            {/* Display the form when not submitted */}
            <Divider textAlign='center' sx={{ margin: '30px 0', fontSize: '25px' }}>{isEditing ? "Edit your Profile" : "Complete your Profile"}</Divider>
            <form>
              <Box sx={{ '& .MuiInputBase-root': { height: 42, backgroundColor: 'white' }, display: 'flex', flexWrap: 'wrap', gap: '20px 0px', justifyContent: 'space-between', padding: '0 20px' }}>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <label htmlFor="contact" style={{ width: '140px' }}>Contact</label>
                  <TextField variant="outlined" id='contact' sx={{ width: '250px' }} type='text' name='contact' onChange={handleChange} />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <label htmlFor="doj" style={{ width: '140px' }}>Date of Joining</label>
                  <TextField variant="outlined" id='doj' sx={{ width: '250px' }} type='date' name='doj' onChange={handleChange} />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <label htmlFor="designation" style={{ width: '140px' }}>Designation</label>
                  <FormControl variant="outlined" sx={{ width: '250px' }}>
                    <Select
                      value={designationValue}
                      id="designation"
                      onChange={(e) => {
                        handleDesignation(e)
                        handleChange(e)
                      }}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Select option' }}
                      name='designation'
                    >
                      <MenuItem value="" disabled>
                        Select an option
                      </MenuItem>

                      {designations.map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <label htmlFor="category" style={{ width: '140px' }}>Category</label>
                  <FormControl variant="outlined" sx={{ width: '250px' }}>
                    <Select
                      value={categoryValue}
                      id="category"
                      onChange={handleCategory}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Select option' }}
                      name='category'
                      disabled={filledUserDetails.designation !== 'Technical Support'}
                    >
                      <MenuItem value="" disabled>
                        Select an option
                      </MenuItem>

                      {categories.map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <input type="file" onChange={handleFileChange} />
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if any */}
      <button onClick={uploadProfilePic} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>

                <Button className='primary-btn' onClick={handleProfileSubmit} style={{ marginInline: 'auto' }}>Submit</Button>
              </Box>
            </form>
          </>
        ) : (
          <>
          <div style={{display:'flex'}}>
             {/* Display the uploaded profile picture */}
             {imageURL && (
            <div style={{textAlign:'center'}}>
              <div><img src={imageURL} alt="Profile Pic" style={{ width: '230px', height: '230px', borderRadius: '50%' , objectFit:'contain'}} /></div>
               <input type="file" onChange={handleFileChange}/>
               <button onClick={uploadProfilePic} disabled={loading}>
                {loading ? 'Uploading...' : 'Upload'}
      </button>
            </div>
            )}

            {/* Display the updated user details after submission */}
            <TableContainer component={Paper} sx={{ width: '50%', marginInline: 'auto' }}>
              <Table sx={{ width: '100%' }} aria-label="simple table">
                <TableBody>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      Name:
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {userDetails.firstname + ' ' + userDetails.lastname}
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      Employee Id:
                    </TableCell>
                    <TableCell component="th" scope="row" colSpan={2}>
                      {userDetails.employeeId}
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      Email:
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {userDetails.email}
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      Contact:
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {isEditing ? (<><input type='number' onChange={handleContactChange}/> <button onClick={handleProfileSubmit}>Update</button></>) : (<>
                       {userDetails.contact}
                       <button onClick={editContact}><EditIcon /></button>
                      </>)} 
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      Date of Joining:
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {userDetails.doj}
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      Designation:
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {userDetails.designation}
                    </TableCell>
                  </TableRow>

                
                  {userDetails.designation === 'Technical Support' && (
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      Category:
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {userDetails.category}
                    </TableCell>
                  </TableRow>
                  )} 
                </TableBody>
              </Table>
            </TableContainer>
          
            </div>
          </>
        )}
      </Box>
    </>
  )
}

export default MyProfile