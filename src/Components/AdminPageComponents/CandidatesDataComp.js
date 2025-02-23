import React from 'react'

function CandidatesDataComp({ canObj }) {
    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="bg-[#d8ebf2] container mx-auto flex px-5 py-10 md:flex-col flex-col rounded-lg md:w-[450px] " style={{boxShadow:"0px 0px 20px rgb(0,0,0,0.3)"}}>
                    <div className='flex place-items-center '>
                        <div className="md:w-36 md:h-36 h-24 w-24 bg-white border-4 border-slate-600 overflow-hidden p-5 object-cover object-center flex-shrink-0 rounded-full mr-4 place-content-center" style={{boxShadow:"0px 0px 15px rgb(0,0,0,0.3)"}}>
                            <img className="" alt="hero" src={canObj.imageUrl} />
                        </div>
                        <div>
                            <div className='title-font flex justify-around gap-3 text-lg md:text-2xl mb-4 font-medium text-gray-900'>
                                <p>{canObj.SlNo}.</p>
                                <p>{canObj.name}</p>
                            </div>
                            <p className='md:text-xl text-xs'>Party : {canObj.party}</p>
                        </div>
                    </div>
                    <hr className='bg-gray-500 my-4 py-0.5' />
                    <div className="flex flex-col md:text-xl text-sm gap-3 ">
                        <p>Post : {canObj.post}</p>
                        <p>Constituency : {canObj.constituency}</p>
                        <p>Age : {canObj.age}</p>
                        <p className='text-wrap'>Address : {canObj.address}</p>
                        <p className='text-blue-700'>Mobile : {canObj.mobile}</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CandidatesDataComp
