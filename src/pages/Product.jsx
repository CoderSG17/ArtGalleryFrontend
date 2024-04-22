import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import '../css/Product.css'
import { useAuth } from '../components/Auth'
import { NavLink } from 'react-router-dom'
import { FaCartPlus } from 'react-icons/fa'
import { toast } from 'react-toastify'
import axios from 'axios'
import FormatPrice from '../components/FormatPrice'
import Loader from '../components/Loader'
const Product = ({ title , navbar}) => {

    const [isLoad , setisLoad] = useState(false)

    const { products } = useAuth()
    // console.log(products)

    const {isLoading}=useAuth()
    const token = localStorage.getItem('token')

    const addToCart = async (id) => {   
        try {
            setisLoad(true)
          const response = await axios.post(`https://glorious-hat-toad.cyclic.app/api/v1/cart/add-cartproducts/${id}`,id,{
            headers:{
            Authorization:token
            }
          });
        //   console.log('Item added to cart:', response.data);
          toast.success(response.data.message);
        //   window.location.reload();
          setisLoad(false)
          return response.data;
        } catch (error) {
            setisLoad(false)
          throw error;
        }
      };

    return (
        <>
            {/* <h1 style={{color: "wheat"
 ,margin:"150px 0 40px 80px" , textDecoration:"underline"}}>{title}</h1>
            <div className="main">
                <ul className="cards">
                    {products.map((elem) => {
                        const { name, price, description, _id } = elem;
                        return <NavLink to={`/menu/${_id}`} style={{ textDecoration: "none", color: "black" }}
                            onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}><li className="cards_item">
                                <div className="card">
                                    <div className="card_image">
                                        <img src={`https://glorious-hat-toad.cyclic.app/api/v1/product/product-photo/${_id}`} alt="No Image" className='img9' /></div><br />
                                    <div className="card_content">
                                        <h2 className="card_title">{name} &#x2022; ${price}</h2>
                                        <div className="card_text">
                                            <p className='para'>{description}</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </NavLink>
                    })}
                </ul>
            </div> */}
            {navbar}

            {isLoading && <Loader></Loader>
                    }
            {isLoad && <Loader></Loader>
                    }
            <h1 style={{
                color: "wheat"
                , margin: "50px 0 40px 80px", textDecoration: "underline"
            }}>{title}</h1>
            <div className="main">
                <ul className="cards">
                    {products.map((elem) => {
                        const { name, price, description, _id ,user} = elem;
                        return  <li className="cards_item" key={_id}>
                                <div className="card">
                                    <div className="card_image">
                                        <img src={`https://glorious-hat-toad.cyclic.app/api/v1/product/product-photo/${_id}`} alt="error" className='img9' />
                                        <div className='cartbtn'>
                                        <FaCartPlus className='carticon' title='Add to Cart' onClick={()=>addToCart(_id)}/>
                                        </div>
                                        <span className="card_price"><FormatPrice price={price}></FormatPrice></span>
                                    </div>

                                    <NavLink to={`/menu/${_id}`} style={{ textDecoration:"none", color: "black" ,listStyle:"none"}}
                            onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}>
                                    <div className="card_content">
                                        <h2 className="card_title">{name}</h2>
                                        <div className="card_text">
                                            <p>{description}
                                            </p>
                                            <b style={{color:"white"}}>Created by {user.name}</b>
                                        </div>
                                    </div>

                        </NavLink>

                                </div>
                            </li>
                    })}

                
                </ul>
            </div>
        </>
    )
}

export default Product