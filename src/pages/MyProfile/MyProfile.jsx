import React, { useState } from 'react'
import { useMyContext } from '../../context/context'
import { Box, Button, Divider, FormControl, IconButton, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';


const MyProfile = () => {
  const [categoryValue, setCategoryValue] = useState('');
  const[designationValue , setDesignationValue] = useState('');

  const[filledUserDetails , setFilledUserDetails] = useState({
    contact:'',
    doj:'',
    designation:'',
    category:'',
    address:''
  })
 
  const designations = ['Human Resources', 'Technical Support', 'Fiancne/Accounting', 'Sales' , 'Marketing' , 'Product Management' , 'Admin' , 'Trainig / Learning & development' , 'Quality Assurance'];
  const categories = ['Network', 'Hardware', 'Software', 'UPS' , 'Others'];

  const useMyContextData = useMyContext()
  const{userDetails} = useMyContextData ;

  
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

 const handleProfileSubmit = (e) => {
      e.preventDefault()
      console.log(filledUserDetails)
 }



  // console.log(userDetails)
  // console.log(filledUserDetails.designation)
  return (
    <>
    <Box component={Paper} sx={{width:"80%",height:'fit-content', padding:'40px 50px'}}>
    
    <TableContainer component={Paper} sx={{ width:'50%' , marginInline:'auto'}}>
      <Table sx={{ width:'100%'}} aria-label="simple table">
        <TableBody>
          { 
          <>   
               {/* <TableRow>
                <TableCell colSpan={3} align='center' sx={{fontWeight:'bold'}}>User Details</TableCell>
               </TableRow> */}
           
                <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                 <TableCell component="th" scope="row" >
                    Name:
                  </TableCell>   
                  <TableCell component="th" scope="row" >
                    {userDetails.firstname + ' ' + userDetails.lastname}
                  </TableCell> 
                  <TableCell component="th" scope="row" >
                  <IconButton> <EditIcon/></IconButton>
              </TableCell>           
              </TableRow>

              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                 <TableCell component="th" scope="row" >
                    Employee Id:
                  </TableCell>   
                  <TableCell component="th" scope="row" colSpan={2}>
                    {userDetails.employeeId}
                  </TableCell>            
              </TableRow>

              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                 <TableCell component="th" scope="row" >
                    Email:
                  </TableCell>   
                  <TableCell component="th" scope="row" >
                    {userDetails.email}
                  </TableCell>            
              </TableRow>
           
          </>
          }
        </TableBody>
      </Table>
    </TableContainer>

   

     <Divider textAlign='center' sx={{margin:'30px 0' , fontSize:'25px'}}>Complete your Profile</Divider>

     <form>
          <Box sx={{'& .MuiInputBase-root': {
            height: 42, // Custom height for all text fields
            backgroundColor:'white',
          },display:'flex' , flexWrap:'wrap' , gap:'20px 0px',justifyContent:'space-between' , padding:'0 20px'}}>

              <Box sx={{display:'flex' , alignItems:'center'}}>
                  <label htmlFor="contact" style={{width:'140px'}}>Contact</label>
                  <TextField variant="outlined" id='contact' sx={{width:'250px'}} type='text' name='contact' onChange={handleChange}/>
              </Box>

              <Box sx={{display:'flex' , alignItems:'center'}}>
                  <label htmlFor="doj" style={{width:'140px'}}>Date of Joining</label>
                  <TextField variant="outlined" id='doj' sx={{width:'250px'}} type='date' name = 'doj' onChange={handleChange}/>
              </Box>

              <Box sx={{display:'flex' , alignItems:'center' }}>
                  <label htmlFor="designation" style={{width:'140px'}}>Designation</label>
                  <FormControl variant="outlined" sx={{width:'250px'}}>
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
                      {/* Placeholder option */}
                      <MenuItem value="" disabled>
                        Select an option
                      </MenuItem>

                      {/* Map through the category options */}
                      {designations.map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
              </Box>

              <Box sx={{display:'flex' , alignItems:'center'}}>
                  <label htmlFor="category" style={{width:'140px'}}>Category</label>
                  <FormControl variant="outlined" sx={{width:'250px'}}>
                    <Select
                      value={categoryValue}
                      id="category"
                      onChange={(e) => {
                        handleCategory(e)
                      }}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Select option' }}
                      name='category'
                      disabled = {filledUserDetails.designation !== 'Technical Support'}
                    >
                      {/* Placeholder option */}
                      <MenuItem value="" disabled>
                        Select an option
                      </MenuItem>

                      {/* Map through the category options */}
                      {categories.map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
              </Box>

              <Box sx={{display:'flex' , alignItems:'center' , width:'100%'}}>
                <label htmlFor="Address" style={{width:'140px'}}>Address</label>
                <TextField multiline id='address' rows={2} sx={{flexGrow:'3'}} variant="outlined" name='address' onChange={handleChange}/>
              </Box>


              <Button className='primary-btn' onClick={handleProfileSubmit} style={{marginInline:'auto'}}>Submit</Button>
          </Box>

     </form>
    </Box>
    </>
  )
}

export default MyProfile