import React, { useState } from 'react';
import { X } from 'lucide-react';

const Failure = ({ errMsg }) => {
  const [isVisible, setIsVisible] = useState(true);

  const removeErrorMsg = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className="bg-[#eea7a7] flex-col items-center justify-center rounded-sm font-Montserrat w-[280px] xs:w-[312px] sm:w-[385px] py-2.5 relative flex">
          <div className="text-[#fa3a50] font-bold flex">
            {errMsg}.
          </div>
          <button 
            onClick={removeErrorMsg} 
            className="flex justify-center items-center p-1 bg-[#000] rounded-3xl top-[-10px] right-[-12px] absolute cursor-pointer"
          >
            <X strokeWidth={3} className="text-[#f5f5f5]" />
          </button>
        </div>
      )}
    </>
  );
};

export default Failure;