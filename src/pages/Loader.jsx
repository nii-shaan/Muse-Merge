import React from 'react'

function Loader() {
  return (
    <>
        <div className="bg-[#151515] h-screen w-full flex flex-col justify-center items-center">
          <div className="animate-pulse flex flex-col items-center gap-4 w-full h-full justify-center">
            <div className="w-full h-[20%] bg-slate-400 rounded-md"></div>
            <div className="w-[80%] h-[10%] bg-slate-400 mx-auto mt-3 rounded-md"></div>
            <div className="h-[5%] bg-slate-400 w-[70%] rounded-md"></div>
            <div className="h-[50%] bg-slate-400 w-[60%] rounded-md"></div>
            <div className="h-[15%] bg-slate-400 w-[95%] rounded-md"></div>
            <div className="h-[20%] bg-slate-400 w-full rounded-md"></div>
          </div>
        </div>
      </>
  )
}

export default Loader