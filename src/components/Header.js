import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { NETFLIX_URL, SUPPORTED_LANG } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const user=useSelector((store)=> store.user);
  const showGptSearch =useSelector((store)=>store.gpt.showGptSearch);

  const handleSignOut =()=>{
    signOut(auth).then(() => {
      navigate("/")
    }).catch((error) => {
      navigate("/error");
    });
  }
  
  useEffect(()=>{
  const unsubscribe=  onAuthStateChanged(auth, (user) => {
        if (user) {
          const {uid,email,displayName,photoURL} = user;
          dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
          navigate("/browse")     
        } else {
          dispatch(removeUser());
          navigate("/")
        }
      });

      return ()=> unsubscribe();
},[])
const handleGptSearch=()=>{
  dispatch(toggleGptSearchView())
}
const handleLanguageChange =(e)=>{
       dispatch(changeLanguage(e.target.value))
}
  return (
    <div className='absolute w-screen pt-10 px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between'>
      <img className="w-44 mx-auto md:mx-0"src={NETFLIX_URL} alt="logo"/>
    { user &&  <div className="flex p-2 justify-between">
    {
        showGptSearch && 
        <select onChange={handleLanguageChange} 
        className='bg-gray-900 p-2 m-2  text-white'>
        {
          SUPPORTED_LANG.map((lang)=>(
            <option key={lang.indentifier} value={lang.indentifier} >{lang.name}</option>
          ))
        } 
      </select>
    }
      
      <button onClick={handleGptSearch} className='py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg'>
        { showGptSearch ? "Home":"Gpt Search"}
      </button>
      <img className='hidden md:block w-12 h-12' src={user?.photoURL} 
      alt="user-logo" />
      <button onClick={handleSignOut} className=' font-bold text-white'>
        (sign out)
      </button>
    </div>
}
      </div>
  )
}

export default Header;