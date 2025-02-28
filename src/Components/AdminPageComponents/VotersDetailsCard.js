import React, { useEffect, useState } from 'react'

function VotersDetailsCard({voterDetailsObj}) {
  const [aNo,setANo]=useState('')
  useEffect(()=>{
    let temp=""+voterDetailsObj.aadharNo
    let temp2=temp.slice(0,temp.length-4)+"****"
    setANo(temp2)
  },[voterDetailsObj.aadharNo])
  // console.log(voterDetailsObj)
  return (
    <div>
      <div className='bg-[rgb(0,0,0,0.2)] md:p-8 p-4 rounded-lg '>
            <section className="text-gray-600 body-font ">
                <div className="bg-[#d8ebf2] container flex md:px-16 px-8 md:py-10 py-4 md:flex-col flex-col rounded-lg " style={{boxShadow:"0px 0px 20px rgb(0,0,0,0.3)"}}>
                    <div className="flex flex-col md:text-xl text-sm gap-3 min-w-[225px]  md:min-w-[250px]">
                        <p className='md:text-2xl text-lg font-semibold text-gray-700'>Name : {voterDetailsObj.name}</p>
                        <p>Username : {voterDetailsObj.username}</p>
                        <p>Age : {voterDetailsObj.age}</p>
                        <p className='text-wrap'>Gender : {voterDetailsObj.gender}</p>
                        <p className='text-wrap'>Aadhar : {aNo}</p>
                        <p className='text-wrap'>Voter Id : {voterDetailsObj.voterId}</p>
                        <p className='text-wrap text-sm mdtext-lg'>email : {voterDetailsObj.email}</p>
                        {
                            (voterDetailsObj.isVoted)?<p className='text-green-600'>Voted</p>:<p className='text-red-600'>Not yet voted</p>
                        }
                        <p className='text-blue-700'>mobile : {voterDetailsObj.mobileNo}</p>
                    </div>
                </div>
            </section>
        </div>
    </div>
  )
}

export default VotersDetailsCard
