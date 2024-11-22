import { Box, Button, Paper, Typography } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import logoImg from '../../images/logoonly.png';
import logoName from '../../images/logoName.png';
import './Logout.css'

const Logout = () => {
    const navigate = useNavigate() ;
    const handleLogout = async() => {
        navigate('/login')
        localStorage.removeItem('userEmployeeId')
      }
  return (
    <>
    <Box component={Paper} className='logout-paper-box'>
    <Box className = 'logout-logo-box' component={"div"} > 
        <img src={logoImg} alt=""  className='logo-img' />
        <img src={logoName} alt="" className='logo-name' />
        </Box>  
    <Typography className='text'>Are you sure you want to logout?</Typography>
    <Button onClick={handleLogout} variant='contained' className='primary-btn'>LogOut</Button>
    </Box>
     
    </>
   
  )
}

export default Logout