import React, { useState } from 'react';

const Failure = ({ errMsg }) => {
  const [isVisible, setIsVisible] = useState(true);

  setTimeout(()=>{
    setIsVisible(false);
  }, 3000);

  return (
    <div className='justify-center mb-2'>
      {isVisible && (
        <div className="bg-[#eea7a7] flex flex-col items-center justify-center rounded-sm font-Montserrat w-[292px] xs:w-[312px] sm:w-[360px] py-2.5 relative">
          <div className="text-[#fa3a50] font-bold flex">
            {errMsg}.
          </div>
        </div>
      )}
    </div>
  );
};

export default Failure;