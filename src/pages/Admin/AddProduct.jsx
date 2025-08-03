import Layout from "../../layout/Layout";
import Food from "../../assets/images/Food.svg";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { AddProducts } from "../../Redux/Slices/AdminSlice";
import toast from "react-hot-toast";

function Addproduct(){
    const dispatch=useDispatch();
    const [addproduct, setaddProduct] = useState({
        productName: '',
        image: null,
        price: '',
        quantity: '',
        description: '',
        category: ''
    });

    function handleUserInput(e) {
       const { name, value, type, files } = e.target;
      
       if (type === 'file') {
           setaddProduct({
               ...addproduct,
               image: files[0] || null
           });
       } else {
           setaddProduct({
               ...addproduct,
               [name]: value
           });
       }
    }

    async function handleFormSubmit(e){
        e.preventDefault();
        const allowedCategories = ["Veg", "Non-Veg", "drinks", "sides"];
        // Validation
        if (!addproduct.productName || !addproduct.image || !addproduct.price || !addproduct.quantity || !addproduct.description) {
            toast.error("Missing value from the form");
            return;
        }
        if (addproduct.productName.length < 1) {
            toast.error("Product name is required");
            return;
        }
        if (!addproduct.price) {
            toast.error("Product price is required");
            return;
        }
        if (!addproduct.image) {
            toast.error("Product image is required");
            return;
        }
        if (!addproduct.quantity) {
            toast.error("Product quantity is required");
            return;
        }
        if (addproduct.description.length < 5) {
            toast.error("Product description must be at least 5 characters");
            return;
        }
        if (!addproduct.category || !allowedCategories.includes(addproduct.category)) {
            toast.error("Please select a valid category");
            return;
        }

        // Prepare FormData for file upload
        const formData = new FormData();
        formData.append('productName', addproduct.productName);
        formData.append('image', addproduct.image);
        formData.append('price', addproduct.price);
        formData.append('quantity', addproduct.quantity);
        formData.append('description', addproduct.description);
        formData.append('category', addproduct.category);

        const apiResponse = await dispatch(AddProducts(formData));
        console.log("api response", apiResponse);
    }



    return(
        <Layout>
            <section className="py-12">
                <div  className="flex items-center justify-center px-5">
                    <div className="md:w-2/6">
                        <img src={Food} />
                    </div>

                    <div className="max-w-md md:w-4/6 mx-auto mt-8 bg-white p-4">
                        <h2 className="mb-4 text-2xl font-semibold">
                            Add product
                        </h2>

                        <form>
                        {/* product name */}
                        <div className="mb-4">
                            <label 
                                htmlFor="productName" 
                                className="block text-sm font-medium text-gray-700"
                            >
                                Product name <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="text" 
                                required
                                onChange={handleUserInput}
                                minLength={5}
                                maxLength={20}
                                name="productName" 
                                id="productName" 
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                                
                            />
                        </div>
                           {/* description */}
                        <div className="mb-4">
                            <label 
                                htmlFor="description" 
                                className="block text-sm font-medium text-gray-700"
                            >
                                Description
                            </label>
                            <input 
                                type="text" 
                                required
                                onChange={handleUserInput}
                                minLength={5}
                                maxLength={60}
                                name="description" 
                                id="description" 
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                                
                            />
                        </div>
                            {/* Price */}
                        <div className="mb-4">
                            <label 
                                htmlFor="price" 
                                className="block text-sm font-medium text-gray-700"
                            >
                                Product price <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="number" 
                                required
                                onChange={handleUserInput}
                                name="price" 
                                id="price" 
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                                
                            />
                        </div>
                             {/* quantity */}
                        <div className="mb-4">
                            <label 
                                htmlFor="quantity" 
                                className="block text-sm font-medium text-gray-700"
                            >
                                Product quantity <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="number" 
                                required
                                onChange={handleUserInput}
                                name="quantity" 
                                id="quantity" 
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                                
                            />
                        </div>
                            {/* category */}
                        <div className="mb-2">
                            <label 
                                htmlFor="category" 
                                className="block text-sm font-medium text-gray-700"
                            >
                                Select Category <span className="text-red-500">*</span>
                            </label>
                            <select 
                                name="category" 
                                id="category" 
                                value={addproduct.category}
                                onChange={handleUserInput}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="Veg">Vegetarian</option>
                                <option value="Non-Veg">Non-Vegetarian</option>
                                <option value="drinks"> Soft drinks</option>
                                <option value="sides">sides</option>
                            </select>
                        </div>
                            {/* image */}
                        <div className="mb-4">
                            <label 
                                htmlFor="productImage" 
                                className="block text-sm font-medium text-gray-700"
                            >
                                Product image <span className="text-red-600">(.jpg, .png, .jpeg )</span>
                            </label>
                            <input 
                                type="file"
                                required
                                onChange={handleUserInput}
                                name="image"
                                id="productImage"
                                accept=".jpg, .jpeg, .png"
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                         <button
                            type="submit"
                            onClick={handleFormSubmit}
                            className="w-full bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                        >
                            Add product
                        </button>
                    </form>


                    </div>

                </div>
            </section>
        </Layout>
    )
}
export default Addproduct;