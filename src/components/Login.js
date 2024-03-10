import React, { useState,useRef } from 'react'
import Header from './Header';
import {isValidData} from "../utils/validate";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { AVATAR_URL, BG_URL } from '../utils/constants';

const Login = () => {
  const [isSignInForm,setIsSignInForm]=useState(true);
  const[errorMessage,setErrorMessage]=useState(null);
  const toggleForm =()=>{
         setIsSignInForm(!isSignInForm);
  }
  const email=useRef(null);
  const password=useRef(null);
  const name=useRef(null);
  const dispatch=useDispatch();
     const handleButtonClick =()=>{
           const message= isValidData(email.current.value,password.current.value);
           setErrorMessage(message);
           if(message) return;
           if(!isSignInForm){
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
              .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                updateProfile(user, {
                  displayName: name.current.value, photoURL: AVATAR_URL
                }).then(() => {
                  const {uid,email,displayName,photoURL} = auth.currentUser;
                  dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL})) 
                }).catch((error) => {
                  setErrorMessage(error.message);
                });     
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode+"-"+errorMessage)
              });
           }
           else{
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
              // Signed in 
              const user = userCredential.user;  
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrorMessage("Email or Password is wrong");
            });         
           }
     }
  return (
    <div >
        <Header />
        <div className='absolute'>
        <img className="h-screen w-screen object-cover"src={BG_URL} alt="bg-img" />
        </div>
        <form onSubmit={(e) =>e.preventDefault()} className='w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80 '>
          <h1 className='font-bold text-3xl py-4'>
            {isSignInForm ? "Sign In" :"Sign Up"}
          </h1>
          { 
            !isSignInForm &&
            <input  ref={name}type="text" placeholder='Name' className='p-3 my-3 w-full bg-gray-700'/>
          }
          <input ref={email} type="text" placeholder='Email' className='p-3 my-3 w-full bg-gray-700'/>
          <input ref={password}type="password" placeholder="Password" className='p-3 my-4 w-full bg-gray-700' />
          <button  className='p-3 my-4 bg-red-700 w-full rounded-lg' onClick={handleButtonClick} >{isSignInForm ? "Sign In" :"Sign Up"}</button>
          <p className='py-2 font-semibold test-lg text-red-600'>{errorMessage}</p>
          <p className='py-4 cursor-pointer'
             onClick={toggleForm} >
              {isSignInForm ? "New to Netflix ? Sign Up now" :"Already registered ? Sign In"}
           </p>         
        </form>
    </div>
  )
}
export default Login;
