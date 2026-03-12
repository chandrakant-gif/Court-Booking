import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../../assets/quickStay-assets/assets/assets'


const Navbar = () => {
  return (
    <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-300  bg-white transition-all duration-300'>
      <Link to='/owner'>
        <img src={assets.logo} alt="logo" className='h-9 invert opacity-80' />
      </Link>
     

    </div>
  )
}

export default Navbar