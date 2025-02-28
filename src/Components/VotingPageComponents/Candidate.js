import React from 'react'
import { useNavigate } from 'react-router-dom';
import useDataContext from './../../Contexts/DataContext';

function Candidate({candidate}) {
  const navigate=useNavigate();
  const {setLogName}=useDataContext()

  async function voteClick(SlNo,nm)
  {
    const obj={
      SlNo:SlNo,
      name:nm
    }
    
    try{
      const response=await fetch('https://votingapp-whl5.onrender.com/submitVote',{
        method:'POST',
        headers:{
          'Authorization':`Bearer ${JSON.parse(localStorage.getItem('token'))}`,
          'Content-Type':'application/json'
        },
        body:JSON.stringify(obj)
      })
      const result=await response.json();
      if(response.status===200)
      {
        alert("Voted Successfully!");
        return;
      }
      if(response.status===400)
      {
        alert(result.message);
        return;
      }
      if (response.status === 500) {
          if (result.error === 'Token expired!') {
            alert("Session expired ! Please login again");
            localStorage.clear();
          setLogName('');
            navigate('/login');
            return;
          }
        }
      if(response.status>200)
      {
        alert('Login or Signup to vote!');
        navigate('/login');
      }
      
    }

    catch(err)
    {
      console.log(err);
    }
  }
  return (
    <div>
      <div className='flex md:text-2xl text-xs w-fit md:px-10 md:gap-10 rounded-xl' style={{boxShadow:"0px 0px 8px rgb(0,0,0,0.3"}}>
        <div className='flex place-items-center'>
            <div className='md:min-h-56 md:min-w-56 sm:w-24 sm:h-24 w-16 h-16 flex place-items-center justify-center'>
            <img src={candidate.imgUrl} alt={candidate.name} className='md:size-48 sm:size-20 size-12'></img>
            </div>
        </div>
        <div className='md:text-8xl text-lg flex place-items-center  border-l-4 md:min-w-28 sm:min-w-12 min-w-10 justify-center'>
            <p>{candidate.SlNo}</p>
        </div>
        <div className='flex flex-col w-full justify-center md:gap-5 gap-2 min-w-32 md:min-w-96 border-r-4 max-w-64 md:max-w-96'>
            <p className='md:text-3xl text-wrap '><span className='md:block hidden'>Name :</span> {candidate.name}</p>
            <div className='flex md:gap-5 gap-2 '>
            <p><span className='hidden md:block'>Post :</span> {candidate.post}</p>
            <p><span className='hidden md:block'>Party :</span> {candidate.party}</p>
            </div>
        </div>
        <div className='flex place-items-center p-3'>
          <button onClick={()=>voteClick(candidate.SlNo,candidate.name)} className='text-white md:text-3xl sm:text-lg text-sm bg-blue-600 sm:py-1.5 py-1 md:py-3 md:px-7 sm:px-3 px-2 rounded-full hover:bg-blue-500 active:scale-90 duration-300'>Vote</button>
        </div>
      </div>
    </div>
  )
}

export default Candidate
