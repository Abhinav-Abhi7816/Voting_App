import React, { useEffect, useState } from 'react'
import VotesViewComponent from './VotesViewComponent';
import { useNavigate } from 'react-router-dom';
import { IoCloudDownloadOutline } from "react-icons/io5";
import CandidatesDataComp from './CandidatesDataComp';
import useDataContext from './../../Contexts/DataContext';
import VotersDetailsCard from './VotersDetailsCard';


function Admin() {

  const [votesArr, setVotesArr] = useState([])
  const [canDataArr, setCanDataArr] = useState([]);
  const [voterDetailsArr, setVoterDetailsArr] = useState([]);
  const [notVotedList,SetNotVotedList]=useState([]);
  const [load,setLoad]=useState('Loading...');
  const{setLogName}=useDataContext();

  const navigate = useNavigate();

  useEffect(()=>{
    setTimeout(() => {
      if(votesArr.length===0)
      {
        setLoad("Unable to connect to Internet...")
      }
    }, 10000);
  },[votesArr])

  async function getCanData() {
    try {
      let response = await fetch('https://votingapp-whl5.onrender.com/candidates/allData', {
        method: "GET",
        headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
      });
      let result = await response.json();
      if (response.status === 500) {
          if (result.error === 'Token expired!') {
            alert("Session expired ! Please login again");
            localStorage.clear();
          setLogName('');
            navigate('/login');
            return;
          }
        }

      // console.log(result.CandidatesData);
      setCanDataArr(result.CandidatesData)
    }
    catch (err) {
      console.log(err);
    }
  }

  async function getVotersDetails() {
    try {
      let response = await fetch('https://votingapp-whl5.onrender.com/votersList', {
        method: "GET",
        headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
      });
      let result = await response.json();
      if (response.status === 500) {
          if (result.error === 'Token expired!') {
            alert("Session expired ! Please login again");
            localStorage.clear();
          setLogName('');
            navigate('/login');
            return;
          }
        }
      setVoterDetailsArr(result.list);
      // console.log(result.list);
      
    }
    catch (err) {
      console.log(err);
    }
  }

  
  useEffect(() => {
    async function getVotesCount() {
      try {
        let response = await fetch('https://votingapp-whl5.onrender.com/votesCount', {
          method: "GET",
          headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        });
        let result = await response.json();
        if (response.status === 500) {
          if (result.error === 'Token expired!') {
            alert("Session expired ! Please login again");
            localStorage.clear();
          setLogName('');
            navigate('/login');
            return;
          }
        }
        let k = Object.values(result.votesCount)
        setVotesArr(k);
      }
      catch (err) {
        console.log(err);
      }
    };
    getVotesCount();
  }, [navigate,setLogName])
  useEffect(()=>{
    if(!voterDetailsArr)
    {
      return;
    }
    let temp=voterDetailsArr.filter((el) => !el.isVoted)
    SetNotVotedList(temp);
  },[voterDetailsArr])

  return (
    <div className='lg:pt-32 pt-20 min-h-lvh w-full'>
      <div className='flex flex-col place-items-center mx-2 my-3 md:mx-8 md:my-4  rounded-xl' style={{ boxShadow: "0px 0px 20px rgb(0,0,0,0.3)" }}>
        <div className='py-4'><h1 className='md:text-3xl text-xl font-semibold border-b-4 px-4 border-black'>Vote Count </h1></div>
        {/* <div className='pb-4'><h1 className='md:text-xl text-xl font-semibold px-4 '>Total votes: </h1></div> */}
        <div className=' flex flex-row flex-wrap w-full justify-around mb-10'>
          {
            (!votesArr || votesArr.length === 0) ? <p className='text-xl text-center md:text-3xl  font-mono'>{load}</p> :
              votesArr.map((el, i) => <div key={i}>
                <VotesViewComponent votesViewObj={el} pos={i + 1}></VotesViewComponent>
              </div>)
          }
        </div>
      </div>

      <div>
        <div className='md:text-xl text-sm flex justify-center place-items-center md:gap-8 gap-4 md:mt-8 mt-2 md:mx-8 mx-2 p-4'>
          <h1>Get Candidates full data?</h1>
          <button onClick={getCanData} className='flex place-items-center gap-3 bg-blue-500 text-white font-semibold px-3 py-1 rounded-md hover:bg-blue-600 duration-300 active:scale-90'>Get Data<IoCloudDownloadOutline className='mt-1 size-6' ></IoCloudDownloadOutline></button>
        </div>
        
        {
          (!canDataArr || canDataArr.length !== 0) ?<div className='mb-10 bg-slate-200 md:p-8 md:mx-8 p-2 mx-2 rounded-xl' >
            <h1 className='text-center text-xl md:text-3xl md:mb-8 mb-2 underline underline-offset-8 ' style={{textShadow:"0px 0px 20px rgb(0,0,0,0.3)"}}>Candidates Full Details:</h1>
            <h1 className='text-center md:text-2xl text-lg md:mb-8 mb-4 text-purple-500 ' style={{textShadow:"0px 0px 20px rgb(0,0,0,0.3)"}}>Total Candidates : {canDataArr.length }</h1>
            <div className='flex justify-around flex-wrap gap-5 md:gap-10 '>
            {canDataArr.map((el,i)=><CandidatesDataComp key={i} canObj={el}></CandidatesDataComp>)}
            </div>
          </div>
          :null
        }
      </div>
        <hr />
      <div>
      <div className='md:text-xl text-sm flex justify-center place-items-center md:gap-8 gap-4 md:mt-8 mt-2 md:mx-8 mx-2 p-4'>
          <h1>Get Voters Data?</h1>
          <button onClick={getVotersDetails} className='flex place-items-center gap-3 bg-indigo-500 text-white font-semibold px-3 py-1 rounded-md hover:bg-indigo-600 duration-300 active:scale-90'>Get List<IoCloudDownloadOutline className='mt-1 size-6' ></IoCloudDownloadOutline></button>
        </div>
        {
          (!voterDetailsArr || voterDetailsArr.length !== 0) ?<div className='mb-10 bg-slate-200 md:p-8 p-3 md:mx-8 mx-2 rounded-xl' >
            <h1 className='text-center md:text-3xl text-xl md:mb-5 mb-2 underline underline-offset-8  ' style={{textShadow:"0px 0px 20px rgb(0,0,0,0.3)"}}>Voters Full Details:</h1>
            <div className='flex justify-center md:flex-row flex-col md:gap-20 gap-1 mb-4'>
            <h1 className='text-center md:text-2xl text-lg md:mb-8 text-purple-500 ' style={{textShadow:"0px 0px 20px rgb(0,0,0,0.3)"}}>Total Voters : {voterDetailsArr.length }</h1>
            <h1 className='text-center md:text-2xl text-lg md:mb-8 text-green-600 ' style={{textShadow:"0px 0px 20px rgb(0,0,0,0.3)"}}>Voted : {voterDetailsArr.length-notVotedList.length }</h1>
            <h1 className='text-center md:text-2xl text-lg md:mb-8 text-red-500 ' style={{textShadow:"0px 0px 20px rgb(0,0,0,0.3)"}}>Not Voted : {notVotedList.length }</h1>
            </div>
            <div className='flex justify-around flex-wrap md:gap-10 gap-5 '>
            {voterDetailsArr.map((el,i)=><VotersDetailsCard key={i} voterDetailsObj={el}></VotersDetailsCard>)}
            </div>
          </div>
          :null
        }
  
      </div>
    </div>
    
  )
}

export default Admin
