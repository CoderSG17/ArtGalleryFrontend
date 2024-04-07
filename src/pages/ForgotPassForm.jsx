import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { toast } from 'react-toastify'
import ChangePassForm from './ChangePassForm'
import '../css/ForgotPass.css'

const ForgotPassForm = () => {


    const [email,setEmail] =useState('')      
      const [otpForm , showform] =useState(true)

      const handleInput = (e) => {
        // console.log(e);
        let name = e.target.name;
        let value = e.target.value;
    
        setEmail({
          ...email,
          [name]: value, //yeh hai dynamic bananae ke liye ; user jo bhi field bharega usme yeh convert ho jayega aur baaki sab as it is rahega  
        });
      };

      // handle form on submit
      const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(email);
    
        try {
          const response = await fetch(`https://glorious-hat-toad.cyclic.app/api/v1/user/forgotPassword`,{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(email),
          });
          console.log("response data : ", response);
          
          
          const resData = await response.json();
          console.log(resData);
          
          if (response.ok) {
              
              //storing tokens in LS through context api 
              // storeTokensInLS(resData.token)
              
              //storing tokens in LS in simple way
              // localStorage.setItem('token',resData.token)
              
              
              // setEmail({email:""});
              // navigate('/home')
              // console.log(resData);
              // setMessage(true)
              showform(false)
              toast.success(resData.message);  
          } else {
            toast.error(`${resData.extraDetails?resData.extraDetails:resData.message}`)
            console.log("error inside response ", "error");
          }
        } catch (error) {
          res.status(400).send(error);
        }
      };


  return (
    <>
        <Navbar></Navbar>
    <div className="ctn">
      <div className="wrapper">
        <div className="title1"><span>Forgot Password</span></div>

      
{ otpForm ?(
       <form onSubmit={handleSubmit} > 
            <label ><h5 style={{color:"white" ,margin:"10px 0 -5px 35px"}}>Enter Your Email</h5></label>
          <div className="row">
            <i className="fas fa-user" style={{color:"white" ,margin:"5px 10px 0 27px" }}></i>
            <input type="text" placeholder="Email" name='email'  required onChange={handleInput} style={{borderRadius:"5px"}} />
          </div>
          <div className="button">
          <input type="submit" value="Send"  className='btn'  style={{margin:"30px 0 -5px 35px"}}/>
          </div>

        </form>)
        :
        <>
        <ChangePassForm email={email} ></ChangePassForm>
        </>
}
      </div>
    </div>
    </>
  )

    }

export default ForgotPassForm;