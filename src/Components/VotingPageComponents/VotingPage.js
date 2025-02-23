import React, { useEffect, useState } from 'react'
import Candidate from './Candidate';
import useDataContext from './../../Contexts/DataContext';
import { useNavigate } from 'react-router';

function VotingPage() {
    const [cData, setCdata] = useState(null);
    const [load,setLoad]=useState('Loading...');

    const navigate=useNavigate();
    const{logName}=useDataContext()
    useEffect(()=>{
        setTimeout(() => {
            if(!cData)
            {
                setLoad('Unable to connect to internet!');
            }
        }, (10000));
    },[cData])

    useEffect(()=>{
        let temp=JSON.parse(localStorage.getItem('isAdmin'));
        if(temp)
        {
            navigate('/admin')
        }
    },[navigate])

    useEffect(() => {
        async function getCData() {
            try {
                const response = await fetch('https://votingapp-avio.onrender.com/candidates');
                let result = await response.json();
    
                setCdata(result.candidatesData)
                // console.log(result.candidatesData);
                // console.log(logName);
            }
            catch (err) {
                console.log(err);
            }
        }
        getCData();
    }, [logName])
    return (
        <div>
            <div className='md:pt-28 pt-12 md:p-10 p-4 flex flex-col place-items-center justify-center w-full '>
            {
                (!cData)?null:<div className='md:p-4 p-2'>
                    <h1 className='md:text-3xl text-sm text-nowrap md:px-8 px-4 font-semibold border-b-4 border-black py-1'>Constituency :  {cData[0].constituency}</h1>
                </div>
            }
            {
                    
                (!cData)?<div className='h-lvh text-xl text-center md:text-5xl font-mono flex justify-center place-items-center'> <p>{load}</p></div> :<div className='md:p-16 p-2 py-8 md:rounded-3xl rounded-lg bg-slate-300 '>
                    <div className='flex flex-col justify-center place-items-center md:p-10 p-4 bg-white md:rounded-3xl rounded-xl overflow-hidden shadow-2xl w-fit gap-5  md:gap-10' style={{boxShadow:"2px 4px 24px rgb(0,0,0,0.3)"}}>
                        <h1 className='md:text-4xl text-xl font-semibold' style={{letterSpacing:"1.5px"}}>Election Ballet</h1>
                    {
                        cData.map((el,i)=><Candidate key={i} candidate={el}></Candidate>)
                    }
                </div>
                </div>
            }
            </div>
        </div>
    )
}

export default VotingPage
