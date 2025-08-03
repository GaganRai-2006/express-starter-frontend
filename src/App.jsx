import {Route,Routes} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Signup from './pages/Auth/Signup'

import NotFound from './pages/NotFound'
import Denied from './pages/Denied'
import Addproduct from './pages/Admin/AddProduct'
import Login from './pages/Auth/Login'
import ProductDeatils from './pages/products/Productsdetails'
import CartDetails from './pages/Cart/Cartdetails'


function App() {
 

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signup" element={< Signup/>} />
        <Route path="/auth/login" element={< Login/>}/>
        <Route path="/denied" element={<Denied />}/>
        <Route path="/admin/addproduct" element={< Addproduct/>}/>
        <Route path='/products/:productId' element={<ProductDeatils/>}/>
        <Route path='/cart' element={<CartDetails/>}/>

        <Route path='*' element={<NotFound/>}/>

      </Routes>
    </>
  )
}

export default App
