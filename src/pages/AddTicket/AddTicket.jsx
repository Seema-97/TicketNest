import React, { useEffect, useState } from 'react'
import './AddTicket.css'
import { Divider , Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography, TextField, Box, FormControl, Select, MenuItem, IconButton} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { addDoc, collection, doc, getDoc, getDocs, query, where} from 'firebase/firestore';
import { fireStoreDb } from '../../firebase.config';
import { useMyContext } from '../../context/context';

const AddTicket = () => {

  const [categoryValue, setCategoryValue] = useState('');
  const [priorityValue, setPriorityValue] = useState('');
  const[pendingTickets , setPendingTickets] = useState([])
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
        const fetchedDoc = await getDoc(doc(fireStoreDb , 'Users' , filledInput.employeeId));
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
    alert('incorrect employeeId')
   }
     
    }

    //function for form submit button
    const handleTicketSubmit = async() =>{
      
      try{
         await addDoc(collection(fireStoreDb , 'Tickets') , {
          ...filledInput
         })

        alert("ticket submitted")
      }
      catch(err){
        console.log(err.message)
      }
      
      clearForm() ;
      console.log('clear form')
      
    }

    //function for fetching pending Tickets data

    useEffect(()=> {
        getPendingTickets()
    } , [])

    const getPendingTickets = async() => {

      const docRef = query(collection(fireStoreDb, "Tickets"),
      where("ticketStatus", '==', "pending"))
      const fetchedDoc = await getDocs(docRef);
      const temp = []
      
      fetchedDoc.forEach((doc) => {
        const data = {
          id: doc.id ,
          info: doc.data()
        }
        temp.push(data)
      })
      
      setPendingTickets(temp)
    }

    console.log(pendingTickets)

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

        <Divider textAlign='center' className='divider'>Add Ticket</Divider>

          <Box className = 'title-box'>
            <label htmlFor="title">Title</label>
            <TextField variant="outlined" id='title' className='title' name='title' onChange={handleChange}/>
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

    <Box className='Boxider'>
    <p>Pending Tickets</p>
    <hr></hr>
    </Box> 

   {pendingTickets &&
     
       <TableContainer component={Paper} sx={{ maxWidth: 1250 }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>TicketId</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>

                {pendingTickets?.map((item) => 
                (<TableBody key={item.id}>
                    <TableRow >
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.info.title}</TableCell>
                        <TableCell>{item.info.category}</TableCell>
                        <TableCell>{item.info.priority}</TableCell>
                        <TableCell>{item.info.ticketStatus}</TableCell>
                    </TableRow>        
                </TableBody>))}
              </Table>
          </TableContainer>
          
          }
    </Box>
    </>
  )
}

export default AddTicket