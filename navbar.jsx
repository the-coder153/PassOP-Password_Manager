import React from 'react'

const navbar = () => {
    return (
        <nav className='bg-slate-800 text-white'>
            <div className="mycontainer flex justify-between items-center px-4 h-16 py-5">

                <div className="logo font-bold text-white text-2xl">
                    <span className='text-green-700'> &lt; </span>
                    <span>Pass</span><span className='text-green-500'>OP /&gt;</span>
                </div>
                <img width={45} src="Designer.png" alt="" />

            </div>
        </nav>
    )
}

export default navbar