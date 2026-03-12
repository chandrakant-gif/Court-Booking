import React ,{useState, useEffect} from 'react'
import Hero from '../components/home/Hero'
import FeaturedDestination from '../components/home/FeaturedDestination'
import FeaturedSports from '../components/home/FeaturedSports'






const Home = ({city,setCity,filteredCities,setFilteredCities,handleChange, handleSelect, }) => {
  
  return (


    <>
    <Hero city={city} setCity={setCity} filteredCities={filteredCities} setFilteredCities={setFilteredCities} handleChange={handleChange} handleSelect={handleSelect} />
    <FeaturedDestination city={city}/>
    <FeaturedSports/>
     
    </>
  )
}

export default Home