import React, { useEffect, useState } from 'react';

const Failure = ({ errMsg, setErrMsg }) => {
  const [isVisible, setIsVisible] = useState(true);

  setTimeout(()=>{
    setErrMsg(null)
    setIsVisible(false);
  }, 3000);

  return (
    <div className='justify-center mb-2'>
      {isVisible && (
        <div className="bg-[#eea7a7e3] flex flex-col items-center justify-center rounded-sm font-Montserrat p-2">
          <div className="text-[#fa3a50] font-semibold flex text-sm">
            {errMsg}!
          </div>
        </div>
      )}
    </div>
  );
};

export default Failure;