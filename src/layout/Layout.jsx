import { useDispatch, useSelector } from "react-redux";
import Pizzalogo from "../assets/images/food_icon.jpg";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Redux/Slices/AuthSlice";
import CartIcon from "../assets/Cart.svg";
import {getCartDetails} from "../Redux/Slices/CartSlice"
import { useEffect } from "react";

function Layout({children}){
    const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
    const {cartsData}=useSelector((state)=>state.cart);
    console.log(isLoggedIn);
    const dispatch=useDispatch();
    const navigate=useNavigate()

    async function handleLogout(e){
        e.preventDefault();
        dispatch(logout())

    }
    async function fetchCartDetails(){
        const response=await dispatch(getCartDetails());
        console.log("useEffect response",response);
        if(response?.payload?.isUnauthorized){
            dispatch(logout());
        }
    }
    useEffect(()=>{
        if(isLoggedIn){
             fetchCartDetails();
        }
       
    },[]);

    return(
        <div>
        <nav className="flex items-center justify-around h-16 text-[#6B7280] font-mono border-none shadow-md">
            <div
                className="flex items-center justify-center space-x-2 cursor-pointer"
                onClick={() => navigate('/')}
            >
                <p className="text-lg font-semibold text-gray-800">Food App</p>
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md bg-orange-400 flex items-center justify-center">
                    <img
                    src={Pizzalogo}
                    alt="Pizza logo"
                    className="w-8 h-8 object-cover"
                    />
                </div>
            </div>



            <div className="hidden md:block">
                <div className='hidden md:block'>
                    <ul className='flex gap-4'>

                        <li className='hover:text-[#FF9110]'>
                            { ' ' }
                            <p>Menu {' '}</p>
                        </li>

                        <li className='hover:text-[#FF9110]'>
                            { ' ' }
                            <p>Services {' '}</p>
                        </li>

                        <li className='hover:text-[#FF9110]'>
                            { ' ' }
                            <p>About {' '}</p>
                        </li>

                    </ul>
                </div>

            </div>

            <div>
                <ul className="flex gap-4">
                    <li className="hover:text-[#FF9110]">
                        {isLoggedIn ? (
                            <Link onClick={handleLogout}>Logout</Link>
                        ) : (
                            <Link to={'/auth/login'}>LogIn</Link>
                        )}
                    </li>

                    {isLoggedIn && (
                        <Link to={'/cart'}>
                            <li>
                                <img src={CartIcon} className="w-8 h-8 inline" />
                                {' '}
                                <p className="text-black inline">{cartsData?.items?.length}</p>
                            </li>

                        </Link>
                    )

                    }
                </ul>
            </div>

        </nav>
            {children}

        <Footer />
        </div>
    )
}
export default Layout;