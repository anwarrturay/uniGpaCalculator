import React, {useState} from 'react'
import { Send } from 'lucide-react'
const VerificationLinkMsg = () => {
    const [isVisible, setIsVisible] = useState(true);

    setTimeout(()=>{
        setIsVisible(false)
    }, 3000)
  return (
        <section>
            {isVisible && (
                <div className="flex items-center bg-[#00ff9570] rounded-sm w-[300px] xs:w-[312px] sm:w-[360px] relative top-4">
                    <Send className='m-2 text-green-800' size={36}/>
                    <div className="text-sm text-green-800 font-medium">
                        We've sent a verification link to your email.
                    </div>
                </div>
            )}
        </section>
  )
}

export default VerificationLinkMsg