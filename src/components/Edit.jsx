import React, { useState } from 'react'
import "../css/Edit.css"
import Navbar from './Navbar'
import { useAuth } from './Auth'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios  from 'axios'

const Edit = () => {
    const { products } = useAuth()
    const { backendApi } = useAuth()
    const { id } = useParams();
    console.log(id)

    console.log(products)
    const productDisplay = products.filter((elem) => elem._id === id)[0];
    console.log(productDisplay)


    const [productData, setProductData] = useState(true)
    const [cardProduct, setcardProduct] = useState({
        name: "",
        description: "",
        price: "",
        photo: "",
    })

    if (productData && products) {
        setcardProduct({
            name: productDisplay.name,
            description: productDisplay.description,
            price: productDisplay.price,
            // photo: products.photo,
        });
        setProductData(false);
    }

    const handleInput = (e) => {
        // console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setcardProduct({
            ...cardProduct,
            [name]: value, //yeh hai dynamic bananae ke liye ; user jo bhi field bharega usme yeh convert ho jayega aur baaki sab as it is rahega  
        });
    };
    const token = localStorage.getItem('token');

    const updateProduct = async (id) => {
        // console.log(params.id)
        try {
            const response = await fetch(`${backendApi}/product/update-product/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify(cardProduct)

            });
            console.log(response)

            const data = await response.json();
            console.log(data)

            if (response.ok) {
                toast.success("Product updated successfully")

            }
            else {
                console.log('error')
            }
        }

        catch (error) {
            console.log("Api not found")
        }
    }

    return (
        <>
            <Navbar></Navbar>
            <div>
                <div className="container container3">
                    {/* <div className="container-close">&times;</div> */}
                    <img
                        src="https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                        alt="image" className='img10' />
                    <div className="container-text">
                        <h2 style={{ textDecoration: "underline" }}>Edit Products</h2>
                        <label className='label1'  >Enter Name</label>
                        <input type="text" placeholder="Name" onChange={handleInput} name='name' value={cardProduct.name} />
                        <label className='label1' >Enter Description</label>

                        <input type="text" placeholder="Description " onChange={handleInput} name='description' value={cardProduct.description} />
                        <label className='label1' >Enter Price</label>

                        <input type="number" placeholder="Price" onChange={handleInput} name='price' value={cardProduct.price} />
          
                        <button type="submit" onClick={() => updateProduct(productDisplay._id)}>Update</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Edit