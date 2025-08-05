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
import Order from "./pages/orders/Order"
import Ordersucess from './pages/orders/OrderSuccess'
import Requireauth from './components/Auth/RequireAuth'


function App() {
 

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signup" element={< Signup/>} />
        <Route path="/auth/login" element={< Login/>}/>
        <Route path="/denied" element={<Denied />}/>

        <Route element={<Requireauth/>}>
          <Route path='/cart' element={<CartDetails/>}/>
          <Route path='/order' element={<Order/>}/>
          <Route path='/order/success' element={<Ordersucess/>}/>
        </Route>


        <Route path="/admin/addproduct" element={< Addproduct/>}/>
        <Route path='/products/:productId' element={<ProductDeatils/>}/>
        

        <Route path='*' element={<NotFound/>}/>

      </Routes>
    </>
  )
}

export default App
