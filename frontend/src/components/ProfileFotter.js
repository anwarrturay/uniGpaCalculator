import React from 'react'

const ProfileFooter = () => {
    const year = new Date().getFullYear();
  return (
    <footer className='fixed bottom-0 left-0 right-0 bg-[#070181] text-white p-3 text-center font-Montserrat'>
        <p>Copyright @ {year}</p>
    </footer>
  )
}

export default ProfileFooter;