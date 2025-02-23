import React from 'react'

function VotesViewComponent({ votesViewObj, pos }) {
    return (
        <div>
            <div className="container text-sm mx-auto min-w-fit">
                <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                    <div className="h-full flex items-center bg-blue-200 min-w-[300px] lg:min-w-[470px] border p-4 rounded-xl shadow-2xl">
                        <div className="lg:w-36 lg:h-36 w-24 h-24 bg-white border-4 border-slate-600 overflow-hidden p-5 object-cover object-center flex-shrink-0 rounded-full mr-4 place-content-center" >
                            <img alt="team" src={votesViewObj.imgUrl} />
                        </div>
                        <div className="flex-grow lg:text-xl">
                            <h2 className="text-gray-900 title-font font-medium">{votesViewObj.name}</h2>
                            <div className='flex gap-5 text-xs md:text-lg place-items-center'>
                                <p className="text-gray-500">{votesViewObj.party}</p>
                                <p className="text-gray-500">Serial No : {votesViewObj.SlNo}</p>
                            </div>
                            <p className="lg:text-3xl text-lg text-green-700">Votes : {votesViewObj.votes}</p>
                            <p className="text-blue-700">Position : {pos}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default VotesViewComponent
