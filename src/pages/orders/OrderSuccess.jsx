import Layout from "../../layout/Layout";
import orderImage from "../../assets/images/orderImage.png";
import { useNavigate } from "react-router-dom";

function Ordersucess(){
   const navigate = useNavigate();
    return (
        <Layout>
            <div className="flex flex-col justify-center items-center py-28">

                <img 
                    width={400}
                    height={400}
                    src={orderImage}
                />

                <p className="text-lg font-semibold">
                    Your order has been placed successfully
                </p>

                <button
                    onClick={() => navigate('/')}
                    className="bg-yellow-500 text-white px-4 py-2 rounded mt-4"
                >
                    Go Back Home
                </button>

            </div>
        </Layout>
    )
}
export default Ordersucess;