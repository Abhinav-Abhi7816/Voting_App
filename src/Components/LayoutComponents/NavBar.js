import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import eLogo from './../Images/Election-commission-L.png'
import useDataContext from './../../Contexts/DataContext'
import { TbLogout } from "react-icons/tb";

function NavBar() {

  const {logName,setLogName}=useDataContext();
  const navigate=useNavigate();

  const[visName,setVisName]=useState('')
  const[adm,setAdm]=useState(false)
  useEffect(()=>{
    let k=JSON.parse(localStorage.getItem('logName'));
    let m=JSON.parse(localStorage.getItem('isAdmin'));
    setVisName(k);
    setAdm(m);
  },[logName]);

  function logOut()
  {
    // localStorage.removeItem('logName')
    // localStorage.removeItem('token')
    // localStorage.removeItem('isAdmin')
    localStorage.clear();
    setLogName('');
    navigate('/Login');
  }

  
  return (
    <div>
      <nav className='flex text-nowrap gap-3 justify-around place-items-center text-xs md:text-xl bg-slate-600 text-white md:p-2 p-4 fixed w-[100%] shadow-2xl'>
                <div >
                    <img className='size-20 md:block hidden' src={eLogo} alt="logo" />
                </div>
                <div className='md:text-4xl text-sm font-bold' style={{letterSpacing:"2px"}}>
                    <NavLink to={'/'}>Voting App</NavLink>
                </div>
                {
                  (!visName && visName!=='')?<div className='flex place-items-center md:gap-5 gap-2'>
                  <NavLink to={'/signUp'} style={({ isActive }) => ({color: isActive ? 'orange' : 'white',})}>SignUp</NavLink>
                  <NavLink to={'/login'} style={({ isActive }) => ({color: isActive ? 'orange' : 'white',})}>Login</NavLink>
              </div>
              :<div className='flex place-items-center gap-2 md:gap-5'>
                <p className='flex place-items-center gap-2' style={{color:'orange'}} >{visName}{(adm)?<span >(Admin)</span>:null}</p>
                <button onClick={logOut}  className='bg-[darkturquoise] md:text-xl px-3 py-2 rounded-lg hover:scale-110 active:scale-100 duration-300 flex place-items-center gap-2'><p className='hidden md:block'>Log-Out</p><TbLogout></TbLogout></button></div>
                }
            </nav>
    </div>
  )
}

export default NavBar
