import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './Navbar.css'
import { useMyContext } from '../../context/context';
import { Route, Routes, useNavigate } from 'react-router-dom';
import navLogoImg from '../../images/logoonly.png';
import navLogoName from '../../images/logoName.png';
import HomeIcon from '@mui/icons-material/Home';
import MessageIcon from '@mui/icons-material/Message';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Home from '../../pages/Home/Home';
import Logout from '../../pages/Logout/Logout';
import AddTicket from '../../pages/AddTicket/AddTicket';
import MyTickets from '../../pages/MyTickets/MyTickets';
import Messages from '../../pages/Messages/Messages';
import MyProfile from '../../pages/MyProfile/MyProfile';



const drawerWidth = 240;

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const allTicketIcon = [<HomeIcon/>,<ListAltIcon/>,<AddIcon/>,<MessageIcon/>,<AccountBoxIcon/>,<LogoutIcon/>]
  const TicketIconForPending = [<MessageIcon/>,<AccountBoxIcon/>,<LogoutIcon/>]
  const useMyContextData = useMyContext()
  const{userDetails} = useMyContextData;
  const navigate = useNavigate()
   
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
    console.log(`Navigating to ${path}`);
  }

  
  const drawer = (
    <div className='sideNavbar'>
        <Box className='login-user-detail-box'>
         <Box className='login-user-profile-pic'>{userDetails.firstname[0]+userDetails.lastname[0]}</Box>
         <Typography noWrap sx={{fontSize:'14px'}} >
            {userDetails?.firstname +" "+userDetails?.lastname} 
          </Typography>
         </Box>
      <Toolbar />
   
      {userDetails.isAuthorisedField === 'approved' && (
        <>
        <List sx={{marginLeft:'20px'}}>
         {['Home', 'My Tickets', 'Add Ticket', 'Messages' ,'My Profile',"Logout"].map((text, index) => (
           <ListItem key={text} disablePadding >
             <ListItemButton  onClick={()=>{ handleNavigate(`/profile/${text.toLowerCase()}`)}}>
               <ListItemIcon>
                 {allTicketIcon[index]}
               </ListItemIcon>
               <ListItemText primary={text} />
             </ListItemButton>
           </ListItem>
         ))}
       </List>
        </>
      )   
      }

{userDetails.isAuthorisedField === 'pending' && (
        <>
        <List sx={{marginLeft:'20px'}}>
         {['Messages' ,'My Profile' ,'Logout'].map((text, index) => (
           <ListItem key={text} disablePadding >
             <ListItemButton onClick={()=>{ handleNavigate(`/profile/${text.toLowerCase()}`)}}>
               <ListItemIcon>
                { TicketIconForPending[index]}
               </ListItemIcon>
               <ListItemText primary={text} />
             </ListItemButton>
           </ListItem>
         ))}
       </List>
        </>
      )   
      }

     
     
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          boxShadow:'none',
          display:'flex',
          justifyContent:'center',
           backgroundColor:'rgb(174, 198, 205)',
           color:'white', 
           height:'75px',
        }}
        className='header'
      >
        <Toolbar>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box className = 'app-logo-box' component={"div"}> 
           <img src={navLogoImg} alt="" className='nav-logo-img' />
           <img src={navLogoName} alt="" className='nav-logo-name' />
          </Box>     
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
             
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)`} , marginTop:'10px'}} >
        <Toolbar />
        {userDetails.isAuthorisedField === 'approved' &&  (
        <>
        <Box  className='main-display-box'>
        <Routes>
          <Route path='/*' element={<Home />}/>
          <Route path='/add ticket' element={<AddTicket />}/>
          <Route path='/my tickets' element={<MyTickets />}/>
          <Route path='/messages' element={<Messages />}/>
          <Route path='/my profile' element={<MyProfile />}/>
          <Route path='/logout' element={<Logout />}/>
        </Routes>
        </Box>

        </>)}

        {userDetails.isAuthorisedField === 'pending' &&  (
        <>
        <Box className='main-display-box'>
          <Routes> 
          <Route path='*' element={<div style={{ fontSize:"20px"}}>'Hii {userDetails.firstname} your account approval is under process. Please visit my profile page to Complete your profile'</div>}/>
          <Route path='/my profile' element={<MyProfile />}/>
          <Route path='logout' element={<Logout />}/>
        </Routes>
        </Box>
        </>)}
        {/* </Box> */}
      </Box>
    </Box>
  );
}

Navbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default Navbar;
