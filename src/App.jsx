import {Route,Routes} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Signup from './pages/Auth/Signup'
import Login from './pages/Auth/Login'
import NotFound from './pages/NotFound'


function App() {
 

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signup" element={< Signup/>} />
        <Route path="/auth/login" element={< Login/>}/>

        <Route path='*' element={<NotFound/>}/>

      </Routes>
    </>
  )
}

export default App
