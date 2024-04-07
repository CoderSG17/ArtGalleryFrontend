import React, { useState } from 'react'
import '../css/Contact.css'
import Navbar from '../components/Navbar'
import {  Comment } from 'react-loader-spinner'
import axios from 'axios'
import { useAuth } from '../components/Auth'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
const Contact = () => {

    const [contactData, setcontactData] = useState(true)
    const [isLoading,setIsLoading]= useState(false)

    const { user } = useAuth()
    // console.log(user)

    const [contact , setContact] = useState({
        name:"",
        subject:"",
        message:"",
        email:""
    })

    if (contactData && user) {
        setContact({
            name: user.name,
            email: user.email,
            
        });
        setcontactData(false);
    }

    const handleInput = (e) => {
        // console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setContact({
            ...contact,
            [name]: value, //yeh hai dynamic bananae ke liye ; user jo bhi field bharega usme yeh convert ho jayega aur baaki sab as it is rahega  
        });
    };

        const token = localStorage.getItem('token');
        
    const handleSubmit = async (e) => {
        e.preventDefault();
                try {
                    setIsLoading(true)
          const response = await fetch('https://glorious-hat-toad.cyclic.app/api/v1/contact', {
            method: 'POST',
            headers: {
                Authorization:token,
                "Content-Type":"application/json",
            }
          });
          console.log(response);
          if(response.ok){
            console.log(1)
              console.log('Response data:', response.data);
              toast.success("Message sent successfully")
              setIsLoading(false)
          }
          else{
            toast.error("Couldn't sent the message ")
            console.log("Error")
            setIsLoading(false)

          }
      
        } catch (error) {
          console.error('Api Not found');
          setIsLoading(false)

        }
      }


    return (
        <>
            <Navbar></Navbar>
            <div className='maindiv'>

                <div class="talk">
                    <p>Let's talk about everything!  &nbsp; <Comment
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="comment-loading"
                        // wrapperStyle={{}}
                        wrapperClass="comment-wrapper"
                        color="#fff"
                        backgroundColor="#F4442E"
                    /></p>
                    
                </div>

                <div class="mid-left">
                    <div>Start your Conversation with us! Here you can know your idea.</div>

                    <img src="images/contact.jpg" alt="error" />
                </div>


                <div class="container container2">
                    <div class="form-container">
                        <form onSubmit={handleSubmit}>
                            <label for="name"></label>
                            <input type="text" id="name" placeholder="Name" required  onChange={handleInput}  name="name" value={contact.name}/>
                            <label for="email"></label>
                            <input type="email" id="email" name="email" placeholder="E-mail" required  onChange={handleInput}   value={contact.email}/>
                            <label for="subject"></label>
                            <input type="text" id="subject" name="subject" placeholder="Subject" required  onChange={handleInput} value={contact.subject} />
                            <label for="message"></label>
                            <textarea id="message" name="message" rows="4" placeholder="Your message here" required  onChange={handleInput}  value={contact.message}></textarea>
                            <input type="submit" value="Send Message" />
                        </form>
                    </div>
                </div>
            </div>
            {isLoading && <Loader></Loader>
                    }                   

        </>
    )
}

export default Contact