
import { Route , Router, Routes} from 'react-router-dom'
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import Profile from './components/Profile/Profile'

function App() {
 
  return (

    <>
    
     <Routes>
     <Route path='/' element = {<SignUp/>} />
     <Route path='/login' element = {<Login/>} />
     <Route path='/profile/*' element= {<Profile/>} />
     </Routes>
    
    </>
  )
}

export default App
