import React from 'react'

const SaveResultDialog = ({setShowDialog}) => {
    const saveHistory = () => {
        console.log("Saved History")
    }
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-[#00000067] flex justify-center items-center'>
        <div className='w-56 h-36 bg-white flex flex-col gap-2 justify-center items-center px-5 rounded-md motion-preset-pop motion-duration-1000'>
            <p className='text-center font-semibold'>Would you like to save in your history?</p>
            <div className='flex gap-2'>
                <button onClick={saveHistory} className='bg-[#070181] text-white py-2 px-5 rounded-md'>Yes</button> 
                <button onClick={()=>setShowDialog(false)} className='bg-[#070181] text-white py-2 px-5 rounded-md'>No</button> 
            </div>
            
        </div>
    </div>
  )
}

export default SaveResultDialog