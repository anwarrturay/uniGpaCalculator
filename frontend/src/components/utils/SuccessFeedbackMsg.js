import React, { useState } from 'react'
import { Send } from 'lucide-react'
const SuccessFeedbackMsg = () => {
    const [isVisible, setIsVisible] = useState(true);

    setTimeout(()=>{
        setIsVisible(false)
    }, 5000)

  return (
    <section>
        {isVisible && (
            <div className="flex items-center bg-[#00ff9570] rounded-sm w-[300px] xs:w-[312px] sm:w-[360px] relative mb-3">
                <Send className='m-2 text-green-800' size={36}/>
                <div className="text-sm text-green-800 font-medium flex flex-col">
                    Message received! We'll get back to you as soon as possible.
                </div>
            </div>
        )}
    </section>
  )
}

export default SuccessFeedbackMsg;