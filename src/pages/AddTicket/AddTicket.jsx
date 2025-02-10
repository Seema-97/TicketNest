import React, { useEffect, useState } from 'react'
import './AddTicket.css'
import { Divider , Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography, TextField, Box, FormControl, Select, MenuItem, IconButton} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { addDoc, collection, doc, getDoc, getDocs, query, where} from 'firebase/firestore';
import { fireStoreDb1} from '../../firebase.config';
import { useMyContext } from '../../context/context';

const AddTicket = () => {

  const [categoryValue, setCategoryValue] = useState('');
  const [priorityValue, setPriorityValue] = useState('');
  // const[pendingTickets , setPendingTickets] = useState([])
  const useMyContextData = useMyContext()
  const{userDetails} = useMyContextData

  const categories = ['Network', 'Hardware', 'Software', 'UPS' , 'Others'];
  const priorities = ['1-high' ,'2-Medium' , '3-low'];

  const[filledInput , setFilledInput] = useState({
    title: '' ,
    employeeId : '',
    category:'',
    priority:'',
    description:'',
    ticketStatus:'pending'
  })

  const clearForm = () => {
    setFilledInput({
      title: '' ,
      employeeId : '',
      category:'',
      priority:'',
      description:'',
      ticketStatus:''
    })
  }

 
  //functions for select button
  const handleCategory = (e) => {
    setCategoryValue(e.target.value);
  };

  const handlePriority = (e) => {
    setPriorityValue(e.target.value)
  }

  // function for inputfields

  const handleChange = (e) => {
    const{name, value} = e.target
    setFilledInput((prev) => {
       return{
        ...prev,
        [name] : value
       }
    })
  }

  //function for employeeId search button
  const handleEmployeeSearch = async() => {
   if(filledInput.employeeId === userDetails.employeeId){
  
      try{
        const fetchedDoc = await getDoc(doc(fireStoreDb1 , 'Users' , filledInput.employeeId));
        console.log(fetchedDoc)
        setFilledInput((prev) => {
          return{
            ...prev,
            name:fetchedDoc.data().firstname + ' ' + fetchedDoc.data().lastname,
            email:fetchedDoc.data().email
          } 
        })
        
        }
      catch(err){
         console.log(err.message)
        }
    }
    else{
    alert('employee id does not exist')
   }
     
    }

    //function for form submit button
    const handleTicketSubmit = async() =>{
      
      try{
         await addDoc(collection(fireStoreDb1 , 'Tickets') , {
          ...filledInput
         })

        alert("ticket submitted")
        clearForm()
      }
      catch(err){
        console.log(err.message)
      }
      
      clearForm() ;
      console.log('clear form')

    }

  return (
   <>

   <Box className='addTicket-container'>
   
    <form className='addTicket-form'>
      <Box component={Paper} className='form-main-box' sx={{
          '& .MuiInputBase-root': {
            height: 40, // Custom height for all text fields
            // backgroundColor:'white',
          },
          padding:'40px'
        }}>

        <Divider className='ticket-form-heading'>Add Ticket</Divider>

          <Box className = 'title-box'>
            <label htmlFor="title">Title</label>
            <TextField variant="outlined" id='title' className='title' name='title' onChange={handleChange} value={filledInput.title}/>
          </Box>

          <Box className='form-mid'>
 
        
          <Box className='mini-box' >

              <label htmlFor="employeeId" >Employee id</label>
              <Box sx={{ display: 'flex', width:'250px', border:'1px solid rgba(0, 0, 0, 0.23);' , borderRadius:'4px'}}>
                <TextField id="employeeId" variant="outlined" 
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none', // Remove the border of the Outlined Input
                  }
                }}
                name='employeeId'
                onChange={handleChange}
                />
                <IconButton type="button" aria-label="search" onClick={() => {handleEmployeeSearch()}}>
                  <SearchIcon />
                </IconButton>
              </Box>

          </Box>

          <Box className='mini-box' >
              <label htmlFor="name" >Name</label>
              <TextField variant="outlined" id='name' sx={{width:'250px'}} type='text' 
              value={filledInput.name}
              />
          </Box>


          <Box className='mini-box' >
              <label htmlFor="email" >Email</label>
              <TextField variant="outlined" id='email' type='email'  sx={{width:'250px'}} value={filledInput.email}/>
          </Box>

          <Box className='mini-box'>
            <label htmlFor="category" >Category</label>
            <FormControl variant="outlined" sx={{width:'250px'}}>
            <Select
              value={categoryValue}
              id="category"
              onChange={(e) => {
                handleCategory(e)
                handleChange(e)
              }}
              displayEmpty
              inputProps={{ 'aria-label': 'Select option' }}
              name='category'
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

          <Box className='mini-box'>
            <label htmlFor="priority" >Priority</label>
            <FormControl variant="outlined" sx={{width:'250px'}}>
            <Select
              value={priorityValue}
              id="category"
              onChange={(e) => {
                handlePriority(e)
                handleChange(e)
              }}
              displayEmpty
              inputProps={{ 'aria-label': 'Select option' }}
              name='priority'
            >
              {/* Placeholder option */}
              <MenuItem value="" disabled>
                Select an option
              </MenuItem>

              {/* Map through the category options */}
              {priorities.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
            </FormControl>
          </Box>
          </Box>

          <Box className='mini-box'>
            <label htmlFor="description">Description</label>
            <TextField multiline id='description' sx={{'& .MuiInputBase-root': { backgroundColor:'white', height:100,}, flexGrow:1}} variant="outlined" name='description' onChange={handleChange}/>
          </Box>
    
          <Box sx={{textAlign:'center'}}><Button className='primary-btn ticket-submit-btn' onClick={handleTicketSubmit}>Submit</Button></Box>
      </Box>
    </form>

    
    </Box>
    </>
  )
}

export default AddTicket