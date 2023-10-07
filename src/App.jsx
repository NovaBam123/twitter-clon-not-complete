import { Box, Heading, Button } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom'
import RegisterUser from './components/register'
import WelcomeUser from './pages/welcome'
import LoginUser from './components/login'
import Beranda from './pages/beranda'

function App() {

  return (
    <Box>
      
      <Routes>
        <Route path='/' element={ <WelcomeUser/>} />
        <Route path='/beranda' element={ <Beranda/>} />
      </Routes>
  
   </Box>
  )
}

export default App
