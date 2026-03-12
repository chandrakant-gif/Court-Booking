import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/quickStay-assets/assets/assets'


const SportsCard = ({sports,index}) => {
  return (
    <Link to={`/venue/${sports._id}`} onClick={() => {scrollTo(0,0)}} key={sports._id} className="relative shadow-md  hover:shadow-2xl transition-shadow duration-300 " >
      <img src={sports.images[0]} alt="Sports" className=""/>

      <div className="absolute bottom-0 left-0 text-white p-4 z-10 ">
        {sports.court.name}
      </div>




    </Link>
  )
}

export default SportsCard